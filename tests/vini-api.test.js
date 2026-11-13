import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import sessionHandler from '../api/vini/session.js';
import profileHandler from '../api/vini/profile.js';
import messagesHandler from '../api/vini/messages.js';
import adminHandler from '../api/vini/admin.js';
import { getSessionId, hashSessionId } from '../api/_lib/vini.js';

process.env.SUPABASE_URL = 'https://supabase.example';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-test-key';
process.env.SUPABASE_ANON_KEY = 'anon-test-key';
process.env.VINI_SESSION_SECRET = 'test-secret-with-more-than-32-characters';
process.env.VINI_ADMIN_EMAIL = 'admin@example.com';

const originalFetch = globalThis.fetch;
const sessionCookie = 'vini_session';

function responseStub() {
  return {
    headers: {},
    statusCode: 200,
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(value) { this.body = value; return this; },
  };
}

function request(method, body, { cookie = '', origin = 'https://site.example', token = '' } = {}) {
  return {
    method,
    body,
    headers: {
      host: 'site.example',
      'x-forwarded-proto': 'https',
      origin,
      cookie,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
}

function cookieValue(response) {
  return response.headers['Set-Cookie']?.split(';')[0];
}

afterEach(() => {
  globalThis.fetch = originalFetch;
});

test('session cookies are signed and stable, and tampering creates a new session', () => {
  const firstResponse = responseStub();
  const firstId = getSessionId(request('GET'), firstResponse, {
    sessionSecret: process.env.VINI_SESSION_SECRET,
  });
  const signedCookie = cookieValue(firstResponse);
  assert.ok(signedCookie.startsWith(`${sessionCookie}=`));

  const secondId = getSessionId(
    request('GET', undefined, { cookie: signedCookie }),
    responseStub(),
    { sessionSecret: process.env.VINI_SESSION_SECRET },
  );
  assert.equal(secondId, firstId);
  assert.equal(hashSessionId(firstId).length, 64);

  const tamperedResponse = responseStub();
  const tamperedId = getSessionId(
    request('GET', undefined, { cookie: `${sessionCookie}=tampered` }),
    tamperedResponse,
    { sessionSecret: process.env.VINI_SESSION_SECRET },
  );
  assert.notEqual(tamperedId, firstId);
});

test('profile storage requires same-origin explicit consent and valid contact details', async () => {
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return new Response(null, { status: 204 });
  };

  const crossOrigin = responseStub();
  await profileHandler(request('POST', { consent: true }, { origin: 'https://attacker.example' }), crossOrigin);
  assert.equal(crossOrigin.statusCode, 403);
  assert.equal(calls.length, 0);

  const mismatchedScheme = responseStub();
  await profileHandler(request('POST', { consent: true }, { origin: 'http://site.example' }), mismatchedScheme);
  assert.equal(mismatchedScheme.statusCode, 403);
  assert.equal(calls.length, 0);

  const invalidEmail = responseStub();
  await profileHandler(request('POST', {
    name: 'Asha',
    email: 'not-an-email',
    consent: true,
    messages: [],
  }), invalidEmail);
  assert.equal(invalidEmail.statusCode, 400);
  assert.equal(calls.length, 0);

  const saved = responseStub();
  await profileHandler(request('POST', {
    name: 'Asha',
    email: 'asha@example.com',
    consent: true,
    messages: [{
      message_id: 'fc2d2766-06bf-4c63-8fc0-df834d220ad7',
      role: 'user',
      content: 'I need a project quote',
    }],
  }), saved);
  assert.equal(saved.statusCode, 200);
  assert.equal(saved.body.saved, true);
  assert.match(calls[0].url, /rpc\/vini_save_customer_consent$/);
  assert.equal(JSON.parse(calls[0].options.body).p_email, 'asha@example.com');
});

test('chat messages are only stored for consented sessions and lead inquiries are flagged', async () => {
  const calls = [];
  let consented = false;
  globalThis.fetch = async (url, options = {}) => {
    calls.push({ url, options });
    if (url.includes('vini_customers?session_id=')) {
      return Response.json(consented ? [{ lead_score: 0 }] : []);
    }
    return new Response(null, { status: 204 });
  };

  const denied = responseStub();
  await messagesHandler(request('POST', {
    message_id: 'fc2d2766-06bf-4c63-8fc0-df834d220ad7',
    role: 'user',
    content: 'I need a project quote',
  }), denied);
  assert.equal(denied.statusCode, 403);
  assert.equal(calls.length, 1);

  consented = true;
  const saved = responseStub();
  await messagesHandler(request('POST', {
    message_id: 'fc2d2766-06bf-4c63-8fc0-df834d220ad7',
    role: 'user',
    content: 'I need a project quote',
  }), saved);
  assert.equal(saved.statusCode, 200);
  assert.ok(calls.some(call => call.url.includes('vini_inquiries?on_conflict=session_id')));
  assert.ok(calls.some(call => call.options.method === 'PATCH'));
});

test('admin endpoints reject unapproved identities before querying customer data', async () => {
  let queriedCustomers = false;
  globalThis.fetch = async url => {
    if (url.endsWith('/auth/v1/user')) return Response.json({ email: 'other@example.com' });
    queriedCustomers = true;
    return Response.json([]);
  };

  const denied = responseStub();
  await adminHandler(request('GET', undefined, { token: 'valid-supabase-token' }), denied);
  assert.equal(denied.statusCode, 403);
  assert.equal(queriedCustomers, false);

  globalThis.fetch = async url => {
    if (url.endsWith('/auth/v1/user')) return Response.json({ email: 'ADMIN@example.com' });
    return Response.json([]);
  };
  const allowed = responseStub();
  await adminHandler(request('GET', undefined, { token: 'valid-supabase-token' }), allowed);
  assert.equal(allowed.statusCode, 200);
  assert.deepEqual(allowed.body.customers, []);
});

test('authorized admins can edit contact details and advance lead status', async () => {
  const updates = [];
  globalThis.fetch = async (url, options = {}) => {
    if (url.endsWith('/auth/v1/user')) return Response.json({ email: 'admin@example.com' });
    updates.push({ url, options });
    return new Response(null, { status: 204 });
  };
  const sessionId = 'a'.repeat(64);

  const edit = responseStub();
  await adminHandler(request('PATCH', {
    sessionId,
    name: 'Updated Name',
    email: 'updated@example.com',
  }, { token: 'valid-supabase-token' }), edit);
  assert.equal(edit.statusCode, 200);
  assert.deepEqual(JSON.parse(updates[0].options.body), {
    name: 'Updated Name',
    email: 'updated@example.com',
    updated_at: JSON.parse(updates[0].options.body).updated_at,
  });

  const invalid = responseStub();
  await adminHandler(request('PATCH', {
    sessionId,
    name: 'Updated Name',
    email: 'not-an-email',
  }, { token: 'valid-supabase-token' }), invalid);
  assert.equal(invalid.statusCode, 400);
  assert.equal(updates.length, 1);

  const status = responseStub();
  await adminHandler(request('PATCH', {
    sessionId,
    status: 'qualified',
  }, { token: 'valid-supabase-token' }), status);
  assert.equal(status.statusCode, 200);
  assert.ok(updates.some(update => update.url.includes('vini_inquiries?session_id=eq.')));
});

test('session initialization returns no visitor data until consent exists', async () => {
  globalThis.fetch = async () => Response.json([]);
  const response = responseStub();
  await sessionHandler(request('GET'), response);
  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, { profile: null, messages: [] });
  assert.ok(cookieValue(response).includes('vini_session='));
});

import { createHmac, createHash, randomUUID, timingSafeEqual } from 'node:crypto';

const SESSION_COOKIE = 'vini_session';
const MAX_COOKIE_AGE = 60 * 60 * 24 * 30;

export function sendJson(res, status, data) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(status).json(data);
}

export function requireConfiguration() {
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY, VINI_SESSION_SECRET, VINI_ADMIN_EMAIL } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !SUPABASE_ANON_KEY || !VINI_SESSION_SECRET || !VINI_ADMIN_EMAIL) {
    throw new Error('VINI_BACKEND_NOT_CONFIGURED');
  }
  if (Buffer.byteLength(VINI_SESSION_SECRET) < 32) throw new Error('VINI_SESSION_SECRET_TOO_SHORT');
  return {
    url: SUPABASE_URL.replace(/\/$/, ''),
    serviceKey: SUPABASE_SERVICE_ROLE_KEY,
    anonKey: SUPABASE_ANON_KEY,
    sessionSecret: VINI_SESSION_SECRET,
    adminEmail: VINI_ADMIN_EMAIL.toLowerCase(),
  };
}

export function assertSameOrigin(req) {
  const origin = req.headers.origin;
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  if (!origin || !host || !['http', 'https'].includes(protocol)) return false;
  try {
    return new URL(origin).origin === `${protocol}://${String(host).toLowerCase()}`;
  } catch {
    return false;
  }
}

export function readJsonBody(req, maxBytes = 32_000) {
  if (typeof req.body === 'object' && req.body !== null) {
    if (Buffer.byteLength(JSON.stringify(req.body)) > maxBytes) throw new Error('BODY_TOO_LARGE');
    return req.body;
  }
  const raw = typeof req.body === 'string' ? req.body : '';
  if (Buffer.byteLength(raw) > maxBytes) throw new Error('BODY_TOO_LARGE');
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error('INVALID_JSON');
  }
}

function signSession(payload, secret) {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

function parseCookies(header = '') {
  return Object.fromEntries(header.split(';').map(part => {
    const [key, ...value] = part.trim().split('=');
    return [key, value.join('=')];
  }).filter(([key]) => key));
}

export function getSessionId(req, res, config) {
  const cookies = parseCookies(req.headers.cookie);
  const cookie = cookies[SESSION_COOKIE];
  if (cookie) {
    const [id, issuedAt, signature] = cookie.split('.');
    const timestamp = Number(issuedAt);
    if (id && Number.isInteger(timestamp) && timestamp <= Date.now()
      && Date.now() - timestamp <= MAX_COOKIE_AGE * 1000 && signature) {
      const payload = `${id}.${issuedAt}`;
      const expected = Buffer.from(signSession(payload, config.sessionSecret));
      const actual = Buffer.from(signature);
      if (expected.length === actual.length && timingSafeEqual(expected, actual)) return id;
    }
  }

  const id = randomUUID();
  const issuedAt = Date.now();
  const payload = `${id}.${issuedAt}`;
  const value = `${payload}.${signSession(payload, config.sessionSecret)}`;
  const isSecure = process.env.VERCEL || req.headers['x-forwarded-proto'] === 'https';
  res.setHeader('Set-Cookie', `${SESSION_COOKIE}=${value}; Path=/; Max-Age=${MAX_COOKIE_AGE}; HttpOnly; SameSite=Lax${isSecure ? '; Secure' : ''}`);
  return id;
}

export function hashSessionId(id) {
  return createHash('sha256').update(id).digest('hex');
}

export async function databaseRequest(config, path, { method = 'GET', body, prefer } = {}) {
  const response = await fetch(`${config.url}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: config.serviceKey,
      Authorization: `Bearer ${config.serviceKey}`,
      'Content-Type': 'application/json',
      ...(prefer ? { Prefer: prefer } : {}),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const text = await response.text();
  if (!response.ok) {
    console.error('VINI database request failed', response.status);
    throw new Error('DATABASE_REQUEST_FAILED');
  }
  return text ? JSON.parse(text) : null;
}

export function validEmail(value) {
  return typeof value === 'string'
    && value.length <= 254
    && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export function validUuid(value) {
  return typeof value === 'string'
    && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export async function requireAdmin(req, config) {
  const token = req.headers.authorization?.match(/^Bearer (.+)$/i)?.[1];
  if (!token) return false;
  const response = await fetch(`${config.url}/auth/v1/user`, {
    headers: { apikey: config.anonKey, Authorization: `Bearer ${token}` },
  });
  if (!response.ok) return false;
  const user = await response.json();
  return user.email?.toLowerCase() === config.adminEmail;
}

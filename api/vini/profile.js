import {
  assertSameOrigin,
  databaseRequest,
  getSessionId,
  hashSessionId,
  readJsonBody,
  requireConfiguration,
  sendJson,
  validEmail,
  validUuid,
} from '../_lib/vini.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }
  if (!assertSameOrigin(req)) return sendJson(res, 403, { error: 'Request origin was not accepted.' });

  try {
    const config = requireConfiguration();
    const body = readJsonBody(req, 1_000_000);
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (body.consent !== true || (!name && !email) || name.length > 100 || (email && !validEmail(email))) {
      return sendJson(res, 400, { error: 'A name or valid email, and explicit consent are required.' });
    }
    if (!Array.isArray(body.messages) || body.messages.length > 200) {
      return sendJson(res, 400, { error: 'Conversation history is invalid.' });
    }

    const sessionId = hashSessionId(getSessionId(req, res, config));
    const messages = body.messages.map(message => {
      if (!message || !['user', 'bot'].includes(message.role) || typeof message.content !== 'string'
        || !message.content.trim() || message.content.length > 4000 || !validUuid(message.message_id)) {
        throw new Error('INVALID_MESSAGES');
      }
      return { message_id: message.message_id, role: message.role, content: message.content };
    });

    await databaseRequest(config, 'rpc/vini_save_customer_consent', {
      method: 'POST',
      prefer: 'return=minimal',
      body: {
        p_session_id: sessionId,
        p_name: name || null,
        p_email: email || null,
        p_consented_at: new Date().toISOString(),
        p_policy_version: '2026-11-13',
        p_messages: messages,
      },
    });

    return sendJson(res, 200, { saved: true });
  } catch (error) {
    const status = error.message === 'BODY_TOO_LARGE' || error.message === 'INVALID_JSON' || error.message === 'INVALID_MESSAGES'
      ? 400
      : 503;
    console.error('VINI profile save failed', error.message);
    return sendJson(res, status, { error: status === 400 ? 'Submitted details were invalid.' : 'Secure profile storage failed.' });
  }
}

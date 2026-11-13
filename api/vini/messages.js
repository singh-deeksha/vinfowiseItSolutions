import {
  assertSameOrigin,
  databaseRequest,
  getSessionId,
  hashSessionId,
  readJsonBody,
  requireConfiguration,
  sendJson,
  validUuid,
} from '../_lib/vini.js';

const LEAD_TERMS = /\b(quote|pricing|price|budget|proposal|hire|hiring|timeline|start a project|build|develop|need a|looking for|interested in)\b/i;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }
  if (!assertSameOrigin(req)) return sendJson(res, 403, { error: 'Request origin was not accepted.' });

  try {
    const config = requireConfiguration();
    const body = readJsonBody(req, 8_000);
    if (!validUuid(body.message_id) || !['user', 'bot'].includes(body.role)
      || typeof body.content !== 'string' || body.content.trim().length < 1 || body.content.length > 4000) {
      return sendJson(res, 400, { error: 'Message is invalid.' });
    }
    const sessionId = hashSessionId(getSessionId(req, res, config));
    const profile = await databaseRequest(
      config,
      `vini_customers?session_id=eq.${sessionId}&select=session_id,is_lead,lead_score`,
    );
    if (!profile?.length) return sendJson(res, 403, { error: 'Explicit consent is required before saving chat history.' });

    await databaseRequest(config, 'vini_messages?on_conflict=message_id', {
      method: 'POST',
      prefer: 'resolution=ignore-duplicates,return=minimal',
      body: [{ message_id: body.message_id, session_id: sessionId, role: body.role, content: body.content.trim() }],
    });
    await databaseRequest(config, `vini_customers?session_id=eq.${sessionId}`, {
      method: 'PATCH',
      prefer: 'return=minimal',
      body: { updated_at: new Date().toISOString() },
    });

    if (body.role === 'user' && LEAD_TERMS.test(body.content)) {
      const score = Math.min(100, (profile[0].lead_score || 0) + 25);
      await databaseRequest(config, `vini_customers?session_id=eq.${sessionId}`, {
        method: 'PATCH',
        prefer: 'return=minimal',
        body: { is_lead: true, lead_score: score, updated_at: new Date().toISOString() },
      });
      await databaseRequest(config, 'vini_inquiries?on_conflict=session_id', {
        method: 'POST',
        prefer: 'resolution=merge-duplicates,return=minimal',
        body: [{ session_id: sessionId, summary: body.content.trim(), status: 'new', updated_at: new Date().toISOString() }],
      });
    }

    return sendJson(res, 200, { saved: true });
  } catch (error) {
    const status = error.message === 'BODY_TOO_LARGE' || error.message === 'INVALID_JSON' ? 400 : 503;
    console.error('VINI message save failed', error.message);
    return sendJson(res, status, { error: status === 400 ? 'Message is invalid.' : 'Secure message storage failed.' });
  }
}

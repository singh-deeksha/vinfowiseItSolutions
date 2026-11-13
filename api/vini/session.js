import {
  databaseRequest,
  getSessionId,
  hashSessionId,
  requireConfiguration,
  sendJson,
} from '../_lib/vini.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  try {
    const config = requireConfiguration();
    const sessionId = hashSessionId(getSessionId(req, res, config));
    const profiles = await databaseRequest(
      config,
      `vini_customers?session_id=eq.${sessionId}&select=session_id,name,email,consented_at,lead_score,is_lead`,
    );
    const profile = profiles?.[0] || null;
    if (!profile) return sendJson(res, 200, { profile: null, messages: [] });

    const messages = await databaseRequest(
      config,
      `vini_messages?session_id=eq.${sessionId}&select=message_id,role,content,created_at,sequence_number&order=sequence_number.asc&limit=200`,
    );
    return sendJson(res, 200, { profile, messages: messages || [] });
  } catch (error) {
    console.error('VINI session initialization failed', error.message);
    return sendJson(res, 503, { error: 'Secure chat storage is unavailable.' });
  }
}

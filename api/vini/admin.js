import {
  assertSameOrigin,
  databaseRequest,
  readJsonBody,
  requireAdmin,
  requireConfiguration,
  sendJson,
  validEmail,
} from '../_lib/vini.js';

const CUSTOMER_ID = /^[0-9a-f]{64}$/i;
const STATUSES = new Set(['new', 'contacted', 'qualified', 'closed']);

export default async function handler(req, res) {
  if (!['GET', 'PATCH', 'DELETE'].includes(req.method)) {
    res.setHeader('Allow', 'GET, PATCH, DELETE');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }
  if (req.method !== 'GET' && !assertSameOrigin(req)) {
    return sendJson(res, 403, { error: 'Request origin was not accepted.' });
  }

  try {
    const config = requireConfiguration();
    if (!await requireAdmin(req, config)) return sendJson(res, 403, { error: 'Admin access is not authorized.' });

    if (req.method === 'GET') {
      const customers = await databaseRequest(
        config,
        'vini_customers?select=session_id,name,email,consented_at,is_lead,lead_score,status,created_at,updated_at&order=updated_at.desc&limit=100',
      );
      if (!customers?.length) return sendJson(res, 200, { customers: [] });
      const ids = customers.map(customer => customer.session_id);
      const filter = `in.(${ids.join(',')})`;
      const [messages, inquiries] = await Promise.all([
        databaseRequest(config, `vini_messages?session_id=${filter}&select=message_id,session_id,role,content,created_at,sequence_number&order=sequence_number.asc&limit=5000`),
        databaseRequest(config, `vini_inquiries?session_id=${filter}&select=id,session_id,summary,status,created_at,updated_at&order=updated_at.desc`),
      ]);
      return sendJson(res, 200, {
        customers: customers.map(customer => ({
          ...customer,
          messages: (messages || []).filter(message => message.session_id === customer.session_id),
          inquiries: (inquiries || []).filter(inquiry => inquiry.session_id === customer.session_id),
        })),
      });
    }

    const body = readJsonBody(req);
    if (typeof body.sessionId !== 'string' || !CUSTOMER_ID.test(body.sessionId)) {
      return sendJson(res, 400, { error: 'Customer identifier is invalid.' });
    }

    if (req.method === 'PATCH') {
      if (body.status !== undefined) {
        if (!STATUSES.has(body.status)) return sendJson(res, 400, { error: 'Customer status is invalid.' });
        await databaseRequest(config, `vini_customers?session_id=eq.${body.sessionId}`, {
          method: 'PATCH',
          prefer: 'return=minimal',
          body: { status: body.status, updated_at: new Date().toISOString() },
        });
        await databaseRequest(config, `vini_inquiries?session_id=eq.${body.sessionId}`, {
          method: 'PATCH',
          prefer: 'return=minimal',
          body: { status: body.status, updated_at: new Date().toISOString() },
        });
      } else {
        const name = typeof body.name === 'string' ? body.name.trim() : null;
        const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : null;
        if ((name !== null && name.length > 100)
          || (email !== null && email !== '' && !validEmail(email))
          || (!name && !email)) {
          return sendJson(res, 400, { error: 'Customer name or email is invalid.' });
        }
        await databaseRequest(config, `vini_customers?session_id=eq.${body.sessionId}`, {
          method: 'PATCH',
          prefer: 'return=minimal',
          body: {
            name: name || null,
            email: email || null,
            updated_at: new Date().toISOString(),
          },
        });
      }
      return sendJson(res, 200, { updated: true });
    }

    await databaseRequest(config, `vini_customers?session_id=eq.${body.sessionId}`, { method: 'DELETE' });
    return sendJson(res, 200, { deleted: true });
  } catch (error) {
    const status = error.message === 'BODY_TOO_LARGE' || error.message === 'INVALID_JSON' ? 400 : 503;
    console.error('VINI admin request failed', error.message);
    return sendJson(res, status, { error: status === 400 ? 'Request was invalid.' : 'Admin data is currently unavailable.' });
  }
}

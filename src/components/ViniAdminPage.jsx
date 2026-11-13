import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { LockKeyhole, RefreshCw, Trash2 } from 'lucide-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
const statuses = ['new', 'contacted', 'qualified', 'closed'];

async function getAdminData(token) {
  const response = await fetch('/api/vini/admin', {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Could not load customer records.');
  return data.customers;
}

export default function ViniAdminPage() {
  const [session, setSession] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [email, setEmail] = useState('');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!supabase) return undefined;
    let active = true;
    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!active) return;
      if (sessionError) setError(sessionError.message);
      setSession(data.session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (active) setSession(nextSession);
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session?.access_token) return;
    let active = true;
    getAdminData(session.access_token)
      .then(data => {
        if (active) {
          setCustomers(data);
          setSelectedId(current => current || data[0]?.session_id || null);
          setError('');
        }
      })
      .catch(loadError => { if (active) setError(loadError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [session]);

  const requestLoginLink = async event => {
    event.preventDefault();
    if (!supabase) return;
    setError('');
    setNotice('');
    setLoading(true);
    try {
      const { error: authError } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
          shouldCreateUser: false,
        },
      });
      if (authError) console.error('Admin sign-in link request failed', authError.code);
      setNotice('If this email is authorized, a secure sign-in link has been sent.');
    } catch (authError) {
      console.error('Admin sign-in link request failed', authError.message);
      setNotice('If this email is authorized, a secure sign-in link has been sent.');
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    if (!session?.access_token) return;
    setLoading(true);
    try {
      setCustomers(await getAdminData(session.access_token));
      setError('');
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  };

  const updateCustomer = async (customer, update) => {
    setError('');
    try {
      const response = await fetch('/api/vini/admin', {
        method: Object.keys(update).length ? 'PATCH' : 'DELETE',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId: customer.session_id, ...update }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Could not update this customer.');
        return;
      }
      if (update.status) {
        setCustomers(items => items.map(item => item.session_id === customer.session_id
          ? { ...item, status: update.status }
          : item));
      } else if (Object.keys(update).length) {
        setCustomers(items => items.map(item => item.session_id === customer.session_id
          ? { ...item, name: update.name || null, email: update.email || null }
          : item));
      } else {
        setCustomers(items => items.filter(item => item.session_id !== customer.session_id));
        setSelectedId(current => current === customer.session_id ? null : current);
      }
    } catch {
      setError('Could not reach secure customer storage. Please try again.');
    }
  };

  const selected = customers.find(customer => customer.session_id === selectedId);

  return (
    <main className="container-wide min-h-[70vh] py-12 sm:py-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#54868d]">Vini Assistant</p>
          <h1 className="mt-2 text-4xl font-black text-[#493a2e]">Customer inbox</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#706557]">View consented customer details, conversation history, and potential project inquiries.</p>
        </div>
        {session && (
          <div className="flex gap-2">
            <button type="button" onClick={refresh} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#cbdcda] px-4 py-2 text-sm font-semibold text-[#46797e]">
              <RefreshCw size={16} /> Refresh
            </button>
            <button type="button" onClick={() => supabase.auth.signOut()} className="min-h-11 rounded-xl border border-[#ded8c8] px-4 py-2 text-sm font-semibold text-[#625543]">Sign out</button>
          </div>
        )}
      </div>

      {error && <p role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>}
      {notice && <p role="status" className="mt-6 rounded-xl border border-[#cbdcda] bg-[#eaf2f0] p-4 text-sm text-[#46797e]">{notice}</p>}

      {!supabase ? (
        <div className="mt-8 rounded-2xl border border-[#e3dfd1] bg-[#fffdf8] p-6 text-sm leading-7 text-[#706557]">
          Admin authentication is not configured. Add the public Supabase URL and anon key to the Vercel environment to enable sign-in.
        </div>
      ) : !session ? (
        <form onSubmit={requestLoginLink} className="mt-8 max-w-lg rounded-2xl border border-[#e3dfd1] bg-[#fffdf8] p-6">
          <LockKeyhole className="text-[#54868d]" size={24} />
          <h2 className="mt-4 text-xl font-bold text-[#493a2e]">Admin sign in</h2>
          <p className="mt-2 text-sm leading-6 text-[#706557]">Enter your authorized admin email. We’ll send a one-time sign-in link.</p>
          <label className="mt-5 block text-sm font-semibold text-[#625543]">
            Admin email
            <input type="email" required autoComplete="email" value={email} onChange={event => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-[#ded8c8] bg-[#fffdf8] px-4 py-3 outline-none focus:border-[#c49339]" />
          </label>
          <button type="submit" disabled={loading} className="mt-5 min-h-11 rounded-xl bg-[#c6953b] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60">
            {loading ? 'Sending...' : 'Send sign-in link'}
          </button>
        </form>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1.4fr)]">
          <section className="min-w-0">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#706557]">Customers ({customers.length})</h2>
            <div className="max-h-[70vh] space-y-2 overflow-y-auto">
              {customers.map(customer => (
                <button key={customer.session_id} type="button" onClick={() => setSelectedId(customer.session_id)} className={`block w-full rounded-xl border p-4 text-left ${selectedId === customer.session_id ? 'border-[#76a5aa] bg-[#eaf2f0]' : 'border-[#e3dfd1] bg-[#fffdf8]'}`}>
                  <span className="block truncate font-bold text-[#493a2e]">{customer.name || 'Name not shared'}</span>
                  <span className="mt-1 block truncate text-sm text-[#706557]">{customer.email || 'Email not shared'}</span>
                  <span className="mt-2 inline-flex gap-2 text-xs font-semibold text-[#54868d]">{customer.status}{customer.is_lead ? ' · Potential lead' : ''}</span>
                </button>
              ))}
              {!customers.length && <p className="rounded-xl border border-[#e3dfd1] bg-[#fffdf8] p-4 text-sm text-[#706557]">{loading ? 'Loading customer records...' : 'No consented customer records yet.'}</p>}
            </div>
          </section>

          <section className="min-w-0 rounded-2xl border border-[#e3dfd1] bg-[#fffdf8] p-5 sm:p-6">
            {selected ? (
              <>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="break-words text-2xl font-bold text-[#493a2e]">{selected.name || 'Name not shared'}</h2>
                    {selected.email ? <a href={`mailto:${selected.email}`} className="mt-1 block break-all text-sm text-[#46797e]">{selected.email}</a> : <p className="mt-1 text-sm text-[#817766]">Email not shared</p>}
                    <p className="mt-2 text-xs text-[#817766]">Consent recorded {new Date(selected.consented_at).toLocaleString()}</p>
                  </div>
                  <button type="button" onClick={() => {
                    if (window.confirm(`Permanently delete ${selected.name} and their chat history?`)) updateCustomer(selected, {});
                  }} className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700">
                    <Trash2 size={15} /> Delete
                  </button>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <label htmlFor="customer-status" className="text-sm font-semibold text-[#625543]">Status</label>
                  <select id="customer-status" value={selected.status} onChange={event => updateCustomer(selected, { status: event.target.value })} className="min-w-0 max-w-full box-border rounded-lg border border-[#ded8c8] bg-[#fffdf8] px-3 py-2 text-sm">
                    {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                  </select>
                  {selected.is_lead && <span className="text-sm font-semibold text-[#89651f]">Potential lead · score {selected.lead_score}</span>}
                </div>
                <form key={selected.session_id} onSubmit={event => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  updateCustomer(selected, {
                    name: formData.get('name'),
                    email: formData.get('email'),
                  });
                }} className="mt-5 grid gap-3 sm:grid-cols-2">
                  <label className="text-xs font-semibold text-[#625543]">
                    Name
                    <input name="name" defaultValue={selected.name || ''} className="mt-1 w-full rounded-lg border border-[#ded8c8] px-3 py-2 text-sm" maxLength={100} />
                  </label>
                  <label className="text-xs font-semibold text-[#625543]">
                    Email
                    <input name="email" type="email" defaultValue={selected.email || ''} className="mt-1 w-full rounded-lg border border-[#ded8c8] px-3 py-2 text-sm" maxLength={254} />
                  </label>
                  <button type="submit" className="min-h-10 justify-self-start rounded-lg border border-[#cbdcda] px-3 py-2 text-sm font-semibold text-[#46797e] sm:col-span-2">Save contact details</button>
                </form>
                <div className="mt-6">
                  <h3 className="font-bold text-[#493a2e]">Inquiries</h3>
                  {selected.inquiries?.length ? selected.inquiries.map(inquiry => (
                    <p key={inquiry.id} className="mt-2 rounded-xl bg-[#f5f3eb] p-3 text-sm leading-6 text-[#625543]">{inquiry.summary}</p>
                  )) : <p className="mt-2 text-sm text-[#817766]">No potential project inquiry detected.</p>}
                </div>
                <div className="mt-6">
                  <h3 className="font-bold text-[#493a2e]">Conversation</h3>
                  <div className="mt-3 max-h-[45vh] space-y-3 overflow-y-auto rounded-xl bg-[#f8f7f1] p-3">
                    {selected.messages?.map(message => (
                      <article key={message.message_id} className={`max-w-[90%] whitespace-pre-wrap break-words rounded-xl px-3 py-2 text-sm leading-6 ${message.role === 'user' ? 'ml-auto bg-[#e5efee] text-[#493a2e]' : 'bg-white text-[#625543]'}`}>
                        <p>{message.content}</p>
                        <time className="mt-1 block text-[10px] text-[#817766]">{new Date(message.created_at).toLocaleString()}</time>
                      </article>
                    ))}
                    {!selected.messages?.length && <p className="text-sm text-[#817766]">No conversation history saved.</p>}
                  </div>
                </div>
              </>
            ) : <p className="text-sm text-[#817766]">Select a customer to review their details.</p>}
          </section>
        </div>
      )}
    </main>
  );
}

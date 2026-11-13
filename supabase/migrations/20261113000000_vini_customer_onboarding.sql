create table if not exists public.vini_customers (
  session_id text primary key check (session_id ~ '^[0-9a-f]{64}$'),
  name text check (name is null or char_length(name) between 1 and 100),
  email text check (email is null or char_length(email) between 3 and 254),
  constraint vini_customers_name_or_email_check check (name is not null or email is not null),
  consented_at timestamptz not null,
  consent_policy_version text not null,
  is_lead boolean not null default false,
  lead_score integer not null default 0 check (lead_score between 0 and 100),
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vini_messages (
  message_id uuid primary key,
  sequence_number bigint generated always as identity unique,
  session_id text not null references public.vini_customers(session_id) on delete cascade,
  role text not null check (role in ('user', 'bot')),
  content text not null check (char_length(content) between 1 and 4000),
  created_at timestamptz not null default now()
);

create index if not exists vini_messages_session_created_idx
  on public.vini_messages(session_id, created_at);

create table if not exists public.vini_inquiries (
  id uuid primary key default gen_random_uuid(),
  session_id text not null unique references public.vini_customers(session_id) on delete cascade,
  summary text not null check (char_length(summary) between 1 and 4000),
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.vini_save_customer_consent(
  p_session_id text,
  p_name text,
  p_email text,
  p_consented_at timestamptz,
  p_policy_version text,
  p_messages jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.vini_customers (
    session_id, name, email, consented_at, consent_policy_version, status, updated_at
  ) values (
    p_session_id, p_name, p_email, p_consented_at, p_policy_version, 'new', now()
  )
  on conflict (session_id) do update set
    name = excluded.name,
    email = excluded.email,
    consented_at = excluded.consented_at,
    consent_policy_version = excluded.consent_policy_version,
    updated_at = now();

  insert into public.vini_messages (message_id, session_id, role, content)
  select
    (message.value->>'message_id')::uuid,
    p_session_id,
    message.value->>'role',
    message.value->>'content'
  from jsonb_array_elements(p_messages) with ordinality as message(value, ordinal)
  order by message.ordinal
  on conflict (message_id) do nothing;
end;
$$;

alter table public.vini_customers enable row level security;
alter table public.vini_messages enable row level security;
alter table public.vini_inquiries enable row level security;

revoke all on public.vini_customers, public.vini_messages, public.vini_inquiries from anon, authenticated;
grant all on public.vini_customers, public.vini_messages, public.vini_inquiries to service_role;
revoke all on function public.vini_save_customer_consent(text, text, text, timestamptz, text, jsonb) from public, anon, authenticated;
grant execute on function public.vini_save_customer_consent(text, text, text, timestamptz, text, jsonb) to service_role;

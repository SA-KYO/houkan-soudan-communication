-- Enable UUID generation
create extension if not exists "pgcrypto";

-- Profiles
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user',
  display_name text,
  created_at timestamptz default now()
);

-- Rooms
create table if not exists rooms (
  id uuid primary key default gen_random_uuid(),
  status text not null default '未対応',
  priority text not null default '通常',
  flags text[] default '{}',
  created_by uuid not null references auth.users(id) on delete cascade,
  summary jsonb,
  last_message_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references rooms(id) on delete cascade,
  sender_role text not null,
  body text not null,
  attachments jsonb,
  created_at timestamptz default now()
);

create or replace function set_last_message_at()
returns trigger language plpgsql as $$
begin
  update rooms set last_message_at = now() where id = new.room_id;
  return new;
end;
$$;

create trigger trg_last_message_at
after insert on messages
for each row execute function set_last_message_at();

create table if not exists checkins (
  id uuid primary key default gen_random_uuid(),
  anonymous_key uuid not null references auth.users(id) on delete cascade,
  answers jsonb,
  score integer default 0,
  created_at timestamptz default now()
);

create table if not exists resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  tags text[] default '{}',
  published boolean default true,
  created_at timestamptz default now()
);

-- Enable RLS
alter table profiles enable row level security;
alter table rooms enable row level security;
alter table messages enable row level security;
alter table checkins enable row level security;
alter table resources enable row level security;

-- Profiles policies
create policy "profiles_select_self" on profiles
  for select using (auth.uid() = id);

create policy "profiles_admin_all" on profiles
  for all using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Rooms policies
create policy "rooms_insert_owner" on rooms
  for insert with check (auth.uid() = created_by);

create policy "rooms_select_owner" on rooms
  for select using (auth.uid() = created_by);

create policy "rooms_admin_all" on rooms
  for all using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Messages policies
create policy "messages_insert_owner" on messages
  for insert with check (
    exists (select 1 from rooms r where r.id = room_id and r.created_by = auth.uid())
  );

create policy "messages_select_owner" on messages
  for select using (
    exists (select 1 from rooms r where r.id = room_id and r.created_by = auth.uid())
  );

create policy "messages_admin_all" on messages
  for all using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Checkins policies
create policy "checkins_insert_owner" on checkins
  for insert with check (auth.uid() = anonymous_key);

create policy "checkins_select_owner" on checkins
  for select using (auth.uid() = anonymous_key);

-- Resources policies (public read)
create policy "resources_public_read" on resources
  for select using (published = true);

create policy "resources_admin_all" on resources
  for all using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

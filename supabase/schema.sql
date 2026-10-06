create extension if not exists pgcrypto;
create table if not exists profiles(id uuid primary key references auth.users(id) on delete cascade,name text,email text,role text default 'user',balance numeric default 0,created_at timestamptz default now());
create table if not exists contact_numbers(id uuid primary key default gen_random_uuid(),phone text unique not null,active boolean default true,created_at timestamptz default now());
create table if not exists settings(id int primary key,sale_text text default '',updated_at timestamptz default now());
insert into settings(id,sale_text) values(1,'Halo {{nama}}, ada promo terbaru dari kami. Balas jika Anda ingin informasi lebih lanjut.') on conflict(id) do nothing;
create table if not exists withdrawals(id uuid primary key default gen_random_uuid(),user_id uuid references profiles(id) on delete cascade,amount numeric not null,status text default 'pending',created_at timestamptz default now());
create table if not exists campaigns(id uuid primary key default gen_random_uuid(),user_id uuid references profiles(id) on delete set null,mode text not null,message text not null,status text default 'queued',created_at timestamptz default now());
create table if not exists campaign_recipients(id uuid primary key default gen_random_uuid(),campaign_id uuid references campaigns(id) on delete cascade,phone text not null,status text default 'queued',sent_at timestamptz);

alter table profiles enable row level security; alter table contact_numbers enable row level security; alter table settings enable row level security; alter table withdrawals enable row level security; alter table campaigns enable row level security; alter table campaign_recipients enable row level security;
create policy "users own profile" on profiles for select using (auth.uid()=id);
create policy "users insert own profile" on profiles for insert with check (auth.uid()=id);
create policy "users update own profile" on profiles for update using (auth.uid()=id);
create policy "users own campaigns" on campaigns for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "users own withdrawals" on withdrawals for all using (auth.uid()=user_id) with check (auth.uid()=user_id);
create policy "authenticated settings read" on settings for select to authenticated using (true);

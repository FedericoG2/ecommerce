create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  price numeric(10, 2) not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  image_url text not null,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "public read products"
  on public.products
  for select
  to anon, authenticated
  using (true);

create policy "public insert products"
  on public.products
  for insert
  to anon, authenticated
  with check (true);

create policy "public update products"
  on public.products
  for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "public delete products"
  on public.products
  for delete
  to anon, authenticated
  using (true);

grant select, insert, update, delete on public.products to anon, authenticated;

insert into public.products (name, description, price, stock, image_url)
values
  (
    'Taza clásica',
    'Cerámica blanca, 300 ml. Apta para café y té.',
    4500,
    12,
    'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80'
  ),
  (
    'Taza con platillo',
    'Taza blanca con platillo, 220 ml.',
    5200,
    8,
    'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=900&q=80'
  ),
  (
    'Taza espresso',
    'Boca ancha, 80 ml. Pensada para un café corto.',
    3800,
    18,
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80'
  ),
  (
    'Taza de café',
    'Taza con platillo, 220 ml. Para un café cortado.',
    6900,
    10,
    'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=900&q=80'
  ),
  (
    'Taza de té',
    'Porcelana fina, 250 ml. Liviana y de borde delgado.',
    5400,
    14,
    'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80'
  ),
  (
    'Platos de gres',
    'Platos de gres esmaltado, para el desayuno.',
    8200,
    7,
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80'
  ),
  (
    'Tazas de gres',
    'Tazas bajas de gres, para espresso o postre.',
    9800,
    5,
    'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80'
  ),
  (
    'Taza latte',
    'Para un café con leche. Borde fino, 280 ml.',
    4700,
    16,
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80'
  ),
  (
    'Set de tres tazas',
    'Tres tazas con platillo, para servir café.',
    11500,
    6,
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80'
  ),
  (
    'Mesa de café',
    'Una mesa servida con tazas de distintos tamaños.',
    5900,
    9,
    'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=900&q=80'
  );

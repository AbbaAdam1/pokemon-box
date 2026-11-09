# Pokémon Box

A web app for building your own Pokémon collection. Sign up, pick Pokémon from the original 151, and keep them in a personal box that's saved to your account.

**Live demo:** https://pokemon-box-nine.vercel.app/

---

## Features

- **Accounts:** sign up, sign in, sign out, and reset a forgotten password by email (Supabase Auth)
- **Add Pokémon:** choose any of the original 151 from a dropdown, and it's saved to your box (up to 24 per box, one of each species)
- **View details:** click a Pokémon to see its official artwork, types, and Pokédex entry
- **Release Pokémon:** remove a Pokémon from your box
- **Works on mobile:** the layout adjusts to the screen size

## Tech Stack

| Area | Tools |
| --- | --- |
| Frontend | Next.js (App Router), React, Tailwind CSS |
| Forms | Formik, Yup |
| Auth & database | Supabase (Auth + Postgres) |
| Pokémon data | [PokéAPI](https://pokeapi.co/) |
| Hosting | Vercel |

---

## Running Locally

### 1. Clone and install

```bash
git clone https://github.com/AbbaAdam1/pokemon-box.git
cd pokemon-box
npm install
```

### 2. Set up Supabase

Create a free project at [supabase.com](https://supabase.com), then run this in the **SQL Editor**:

```sql
create table user_pokemon (
  id         bigint generated always as identity primary key,
  user_id    uuid not null references auth.users (id) on delete cascade,
  pokemon_id int  not null,
  pokemon    text not null
);

alter table user_pokemon enable row level security;

create policy "Users can read their own Pokémon"
  on user_pokemon for select using (auth.uid() = user_id);

create policy "Users can add their own Pokémon"
  on user_pokemon for insert with check (auth.uid() = user_id);

create policy "Users can release their own Pokémon"
  on user_pokemon for delete using (auth.uid() = user_id);
```

For password reset emails to link back to your app, add `http://localhost:3000/**` under **Authentication → URL Configuration → Redirect URLs**.

### 3. Add environment variables

Create a `.env.local` file in the project root, using the values from **Project Settings → API**:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Start the dev server

```bash
npm run dev
```

Open http://localhost:3000.

---

## Project Structure

```
src/
├── app/            # Next.js routes (home, sign-in, sign-up, profile, password reset, auth callbacks)
├── components/     # UI: PokemonTrainer (the box), Dropdown (add), Modals (details/release), Auth forms
├── config/         # Supabase client
└── middleware.js   # Keeps the Supabase session fresh
public/             # Box backgrounds, logo, type icons
```

## Credits

Pokémon data and sprites come from [PokéAPI](https://pokeapi.co/). Pokémon and Pokémon character names are trademarks of Nintendo, Creatures Inc., and GAME FREAK inc. This is a non-commercial fan project.

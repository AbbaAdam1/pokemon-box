import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import SignOut from 'src/components/SignOut';
import PokemonTrainer from 'src/components/PokemonTrainer';

export default async function Profile() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  //      <div className="heading">Last Signed In:</div>
  //      <code className="highlight">{new Date(user.last_sign_in_at).toUTCString()}</code>

  return (
    <div className="card">
      <p className="text-2xl font-bold">User Profile</p>
      <code className="highlight">{user.email}</code>
      <PokemonTrainer user={user}/>

      <SignOut />
    </div>
  );
}
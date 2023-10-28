'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation'; // Import the useRouter hook

export default function SignOut() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      // eslint-disable-next-line no-console
      console.error('ERROR:', error);
    } else {
      router.push('/sign-in');
    }
  }

  return (
    <button type="button" className="button-inverse" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import SignOut from 'src/components/SignOut';

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="card">
      <h2>Welcome!</h2>
      <code className="highlight">{user.role}</code>
      <code className="highlight">{user.email}</code>
      <Link className="button" href="/profile">
        Go to Box
      </Link>
      <SignOut />
    </div>
  );
}
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import SignIn from 'src/components/Auth/SignIn';

export default async function SignInPage() {
  //_createServerComponentClient<Database>({ cookies })

  //const cookieStore = cookies();
  //return _createServerComponentClient<Database>({ cookies: () => cookieStore });

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data } = await supabase.auth.getSession();

  if (data?.session) {
    redirect('/');
  }

  return <SignIn />;
}
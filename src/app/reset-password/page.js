import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import ResetPassword from 'src/components/Auth/ResetPassword';

export default async function ResetPasswordPage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data } = await supabase.auth.getSession();

  if (data?.session) {
    redirect('/');
  }

  return <ResetPassword />;
}
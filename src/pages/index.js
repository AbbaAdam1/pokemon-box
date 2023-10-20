import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Welcome to My Next.js App</h1>
      <p>Start building your amazing application here!</p>
      <Link href="/app/auth/login">Login</Link>
    </div>
  );
};

export default Home;

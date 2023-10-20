import React from "react";
import { useRouter } from 'next/router';
import { signUp } from "../firebase/auth/signup";
import { createUserInDatabase } from "./api/createUserInDatabase"; // Assuming you have a createUserInDatabase function

function SignUpPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    try {
      const { result } = await signUp(email, password);
      await createUserInDatabase(result.user.uid, email); // This saves user data in PostgreSQL

      console.log("Signup successful");
      router.push("/admin");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30">Sign up</h1>
        <form onSubmit={handleForm} className="form">
          <label htmlFor="email">
            <p>Email</p>
            <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
          </label>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;

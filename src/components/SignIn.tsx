"use client";

import { signIn } from "@/actions/user";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const SignIn = () => {
  const [signInState, signInAction] = useFormState(signIn, {
    success: false,
    error: null,
  });

  useEffect(() => {
    if (signInState.error) {
      alert(signInState.error);
    }
  }, [signInState]);
  return (
    <form className="flex flex-col gap-10" action={signInAction}>
      <input type="email" name="email" />
      <input type="password" name="password" />
      <button type="submit">submit</button>
    </form>
  );
};

export default SignIn;

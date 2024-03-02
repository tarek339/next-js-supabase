"use client";

import { signUp } from "@/actions/user";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const SignUp = () => {
  const [signUpState, signUpAction] = useFormState(signUp, {
    success: false,
    error: null,
  });

  useEffect(() => {
    if (signUpState.success) {
      alert("user created");
    }
    if (signUpState.error) {
      alert(signUpState.error);
    }
  }, [signUpState]);
  return (
    <form className="flex flex-col gap-10" action={signUpAction}>
      <input type="text" name="name" />
      <input type="text" name="email" />
      <input type="password" name="password" />
      <button type="submit">submit</button>
    </form>
  );
};

export default SignUp;

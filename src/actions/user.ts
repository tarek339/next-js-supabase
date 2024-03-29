"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signUp = async (prev: any, formData: FormData) => {
  const supabase = createServerActionClient({
    cookies: cookies,
  });
  try {
    const name = formData.get("name");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (name === "") {
      return {
        succuess: false,
        error: "please enter ur name",
      };
    }

    // with supabase no inter email and password validation needed.
    // SB proivdes this service
    const { data, error } = await supabase.auth.signUp({
      // in auth supabase email and password are a musthave for sign up
      email,
      password,
      // in options extra infos can be added
      options: {
        data: {
          name,
        },
        emailRedirectTo: "http://localhost:3000/api/auth/callback",
      },
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};

export const signIn = async (prev: any, formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = createServerActionClient({
      cookies: cookies,
    });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
  redirect("/profile");
  return {
    success: true,
    error: null,
  };
};

export const signOut = async () => {
  // cookies().delete("token"); without supabase
  const supabase = createServerActionClient({
    cookies: cookies,
  });
  await supabase.auth.signOut();
  redirect("/sign-in");
};

export const reqResetPassword = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const supabase = createServerActionClient({
    cookies: cookies,
  });

  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3000/api/auth/reset-pass-callback",
  });
};

export const resetPassword = async (formData: FormData) => {
  const password = formData.get("password") as string;
  const supabase = createServerActionClient({
    cookies: cookies,
  });

  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  console.log(data);
  console.log(error);
};

export const changeEmail = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const supabase = createServerActionClient({
    cookies: cookies,
  });

  // after submitting the new email
  // user will recieve an email to confirm the changes and verify the new email
  // the link in the email will redirect the user to the main page
  const { data, error } = await supabase.auth.updateUser({
    email,
  });

  console.log(data);
  console.log(error);
};

export const changePassword = async (formData: FormData) => {
  const prevPassword = formData.get("prev-password") as string;
  const password = formData.get("password") as string;
  const supabase = createServerActionClient({
    cookies: cookies,
  });

  // * before updating the new password user should confirm his old password
  // * for that we need a function that gets the old password from db
  // * and checks in the old password === prevPassword
  // ! if not the funciton should return an error and stop the process
  // esle it continues this function
  // todo: fetch the old password from the db
  // ? How to get the old password when passwords are encrypted and secured in the db?
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  console.log(data);
  console.log(error);
};

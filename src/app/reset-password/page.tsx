import { resetPassword } from "@/actions/user";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

const page = async ({ searchParams }: any) => {
  console.log(searchParams.code);
  const supabase = createServerComponentClient({
    cookies: () => cookies(),
  });

  //   await supabase.auth.exchangeCodeForSession(searchParams.code);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session);

  return (
    <div className="bg-[lightgrey] p-20">
      <form action={resetPassword}>
        <input type="password" name="password" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default page;

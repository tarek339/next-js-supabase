import { signOut } from "@/actions/user";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const page = async () => {
  const supabase = createServerComponentClient({
    cookies: () => cookies(),
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="grid justify-center align-center mt-20">
      <h2>{session?.user.user_metadata.name}</h2>
      <h2>{session?.user.email}</h2>
      <form action={signOut}>
        <button>log out</button>
      </form>
    </div>
  );
};

export default page;

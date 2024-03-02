import { reqResetPassword } from "@/actions/user";
import React from "react";

const page = () => {
  return (
    <div className="bg-[lightgrey] p-20">
      <form action={reqResetPassword}>
        <input type="email" name="email" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default page;

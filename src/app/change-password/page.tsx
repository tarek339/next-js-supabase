import { changePassword } from "@/actions/user";
import React from "react";

const page = () => {
  return (
    <div className="bg-[lightgrey] p-20">
      <form action={changePassword}>
        <input type="password" name="prev-password" />
        <input type="password" name="password" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default page;

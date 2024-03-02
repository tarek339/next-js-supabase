import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

// in the middleware next knows what to do because of the names
const authPages = [
  "/profile",
  "/reset-password",
  "/change-email",
  "/change-password",
];
const unAuthPages = ["/sign-in", "sign-up"];
export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({
    req: req,
    res: res,
  });

  const path = req.nextUrl.pathname;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (authPages.includes(path) && !session) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (unAuthPages.includes(path) && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
};

export const config = {
  matcher: [...authPages, ...unAuthPages],
};

import { cookies } from "next/headers";
import { connectToDb } from "./mongoos";
import jwt from "jsonwebtoken";
import { User } from "@/models/userModel";

interface TokenData {
  userId: string;
}

export const getUser = async () => {
  try {
    // await connectToDb();
    const token = cookies().get("token")?.value; // to verify first get the token. the token encrypted and stores the user id
    const tokenData = jwt.verify(token!, process.env.JWTSECRET!) as TokenData; // verfify the token and decrypt the token to get user id
    const user = await User.findById(tokenData.userId);
    return user;
  } catch (error) {
    console.log("error ", error);
    return null;
  }
};

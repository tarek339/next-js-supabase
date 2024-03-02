import { connect } from "mongoose";

export const connectToDb = async () => {
  console.log("connect ", connect);
  await connect(
    "mongodb+srv://tarek:Sony2020@cluster0.ywzi97j.mongodb.net/webshop?retryWrites=true&w=majority"
  );
};

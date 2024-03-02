import Button from "@/components/Button";
import { connectToDb } from "@/lib/mongoos";
import { productModel } from "@/models/productModel";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  await connectToDb();
  const products = await productModel.find();

  const supabase = createServerComponentClient({
    cookies: () => cookies(),
  });

  // * to update the new email or any changes
  // * refresh session is necessary
  // * otherwise the user has to sign out and back in to create a new session
  await supabase.auth.refreshSession();

  return (
    <div className="grid justify-center align-center mt-20">
      <h1>HOMEPAGE</h1>
      {products.map((product, i) => {
        return (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <h3>{product.description}</h3>
            <h3>{product.price}</h3>
            <Link href={`/products/${product._id}`}>View details</Link>
          </div>
        );
      })}
      <Button />
    </div>
  );
}

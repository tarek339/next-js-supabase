import { connectToDb } from "@/lib/mongoos";
import { productModel } from "@/models/productModel";

const page = async ({ params }: any) => {
  await connectToDb();
  const product = await productModel.findById(params.id);
  return (
    <div className="grid justify-center align-center mt-20">
      <h1>Product</h1>
      <h1>{product.name}</h1>
      <h1>{product.price}</h1>
    </div>
  );
};

export default page;

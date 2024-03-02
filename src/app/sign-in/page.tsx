import SignIn from "@/components/SignIn";

const page = async () => {
  // const user = await getUser();

  return (
    <div className="bg-[lightgrey] p-20">
      <SignIn />
    </div>
  );
};

export default page;

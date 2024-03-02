"use client";

import { useEffect, useState } from "react";

const page = () => {
  // dont do this in next
  const [response, setResponse] = useState("");
  const getProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setResponse(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h1>{response}</h1>
      <button onClick={() => console.log("heloo")}>HIHIH</button>
    </div>
  );
};

export default page;

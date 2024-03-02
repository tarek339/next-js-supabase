const page = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return (
    <div>
      <h1>POSTS</h1>
      {posts.map((post: any) => {
        return (
          <div>
            <h3>{post.title}</h3>
            <h3>{post.id}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default page;

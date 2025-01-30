import React from "react";
const page = ({ params }) => {
  return (
    <main>
      <h1 style={{ color: "white", textAlign: "center" }}>
        This is a {params.meal} page!
      </h1>
    </main>
  );
};

export default page;

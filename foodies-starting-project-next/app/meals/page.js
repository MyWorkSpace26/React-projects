import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <main>
      <h1 style={{ color: "white", textAlign: "center" }}>
        This is a Meal page!
      </h1>
      <p style={{ textAlign: "center" }}>
        <Link
          href="/meals/meal-1"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          First Meal
        </Link>
        <Link
          href="/meals/meal-2"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Second Meal
        </Link>
      </p>
      <p style={{ textAlign: "center" }}>
        <Link
          href="/meals/share"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Shear meals
        </Link>
      </p>
    </main>
  );
};

export default page;

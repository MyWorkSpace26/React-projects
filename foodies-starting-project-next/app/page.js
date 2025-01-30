import Link from "next/link";
export default function Home() {
  return (
    <main>
      <h1 style={{ color: "white", textAlign: "center" }}>
        Time to get started!
      </h1>
      <p style={{ textAlign: "center" }}>
        <Link
          href="/meals"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Show All Meals
        </Link>
      </p>
    </main>
  );
}

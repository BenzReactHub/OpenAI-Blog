import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>This is the Home Page</h1>
      <div>
        <Link href="/api/auth/login">Login</Link>
      </div>
    </div>
  );
}

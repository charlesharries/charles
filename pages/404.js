import Link from "next/link";

export default function Error404() {
  return (
    <div className="stack">
      <h1>404</h1>
      <p>Couldn't find that one.</p>
      <Link href="/">Back home</Link>
    </div>
  );
}

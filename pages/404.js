import Link from "next/link";

export default function Error404() {
  return (
    <div className="stack">
      <h1>404</h1>
      <p>Couldn't find that one.</p>
      <p>
        <Link href="/"><a className="link">Back home &#8617;</a></Link>
      </p>
    </div>
  );
}

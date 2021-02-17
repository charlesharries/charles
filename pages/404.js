import Link from 'next/link';

// Disable client-side JS.
export const config = {
  unstable_runtimeJS: false,
};

export default function Error404() {
  return (
    <div className="stack">
      <h1>404</h1>
      <p>Couldn't find that one.</p>
      <Link href="/">Back home</Link>
    </div>
  );
}

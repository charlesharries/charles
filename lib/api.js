export async function getAllStreamPosts() {
  const { data } = await fetch('https://api.charlesharri.es/stream.json').then((r) => r.json());

  return data;
}

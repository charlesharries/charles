const api_key = process.env.LAST_FM_API_KEY;
const user = process.env.LAST_FM_USER;

export async function getLatestTracks() {
  const queryParams = {
    method: "user.getrecenttracks",
    user,
    api_key,
    format: "json",
  }
  const url = new URL("http://ws.audioscrobbler.com/2.0/");
  url.search = (new URLSearchParams(queryParams)).toString();
  const response = await fetch(url.toString());

  return response.json()
}
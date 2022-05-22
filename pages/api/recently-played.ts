import { getLatestTracks } from "lib/lastfm";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const tracks = await getLatestTracks();

  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=30")

  return res.status(200).json(tracks);
}
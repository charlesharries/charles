import useSWR from 'swr';

const fetcher = async (input: RequestInfo, init?: RequestInit) => {
  const res = await fetch(input, init);
  return res.json();
}

interface ArtworkSize {
  '#text': string;
  size: string;
}

interface Track {
  name: string;
  album: { '#text': string; };
  artist: { '#text': string; };
  image: ArtworkSize[];
}

interface RecentTracks {
  track: Track[];
}

export default function LatestTrack({ count = 0 }) {
  const { data } = useSWR('/api/latest-tracks', fetcher);
  const recentTracks: RecentTracks = data?.recenttracks
  const tracks = recentTracks?.track;

  if (!(tracks && tracks.length)) return null;

  return (<div className="LatestTracks">
    <p>{tracks[0].name}</p>
    <p>{tracks[0].artist['#text']}</p>
  </div>)
}
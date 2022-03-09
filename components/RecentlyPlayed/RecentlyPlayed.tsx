import useSWR from 'swr';
import Image from 'next/image';

const fetcher = async (input: RequestInfo, init?: RequestInit) => {
  const res = await fetch(input, init);
  return res.json();
}

interface ArtworkSize {
  '#text': string;
  size: string;
}

interface Track {
  '@attr': { nowplaying: string; }
  name: string;
  album: { '#text': string; };
  artist: { '#text': string; };
  image: ArtworkSize[];
}

interface RecentlyPlayed {
  track: Track[];
  '@attr': { user: string; totalPages: string; total: string; }
}

interface LatestTracksResponse {
  recenttracks: RecentlyPlayed;
}

export default function RecentlyPlayed({ count = 0 }) {
  const { data } = useSWR<LatestTracksResponse>('/api/recently-played', fetcher);
  const recentTracks: RecentlyPlayed = data?.recenttracks
  const tracks = recentTracks?.track;
  const size = 64;

  if (!(tracks && tracks.length)) return null;

  const latestTrack = tracks[0];

  const coverArt = (
    <div className="rounded overflow-hidden" style={{ width: size, height: size }}>
      <Image
        className="mb-0"
        src={latestTrack.image.find(i => i.size === 'large')['#text']}
        alt={latestTrack.name}
        width={size}
        height={size}
      />
    </div>
  )

  return (
    <a href="https://www.last.fm/user/Shibbolethian" className="RecentlyPlayed d-block">
      <p className="small-caps mb-0 d-flex align-center">
        <svg width="20" height="20" viewBox="0 0 50 50" fill="#bb0001" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.79 31.315C18.765 32.235 16.79 34.085 13.505 34.085C9.63 34.085 5.9 30.69 5.9 25.26C5.9 18.3 10.36 16.055 13.785 16.055C18.725 16.055 19.805 19.035 21.15 23.165L22.95 28.82C24.745 34.31 28.115 38.72 37.825 38.72C44.785 38.72 49.5 36.57 49.5 30.915C49.5 26.33 46.915 23.955 42.09 22.825L38.5 22.03C36.03 21.465 35.3 20.445 35.3 18.75C35.3 16.825 36.815 15.695 39.285 15.695C41.98 15.695 43.44 16.715 43.665 19.145L49.275 18.465C48.825 13.37 45.345 11.28 39.62 11.28C34.57 11.28 29.63 13.205 29.63 19.37C29.63 23.215 31.48 25.65 36.14 26.78L39.96 27.685C42.825 28.365 43.775 29.555 43.775 31.195C43.775 33.29 41.755 34.135 37.94 34.135C32.27 34.135 29.425 31.135 28.075 27.005L26.22 21.35C23.865 13.995 21.085 11.28 13.62 11.28C6.96 11.28 0.5 16.54 0.5 25.48C0.5 34.08 6.705 38.72 13.225 38.72C17.94 38.72 20.335 37.06 21.505 36.215L19.79 31.315Z" fill="#bb0001" />
        </svg>

        <span className="ml-sm">
          {latestTrack['@attr']?.nowplaying === 'true' ? 'Now playing' : 'Recently played'}
        </span>
      </p>
      <div className="d-flex align-center mt-sm">
        {coverArt}
        <div className="ml-sm flex-1">
          <p className="mb-0 font-bold">{latestTrack.name}</p>
          <p className="mb-0 text-faded">{latestTrack.artist['#text']}</p>
        </div>
      </div>
    </a>
  )
}
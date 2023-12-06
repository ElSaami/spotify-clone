import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";

function Song({ order, track }) {
  const spotifyApi = useSpotify();

  return (
    <div className="grid grid-cols-2 text-gray-500">
      <div className="flex items-center space-x-4">
        <p className="w-4 text-right">{order + 1}</p>
        <img 
          className="h-10 w-10"
          src={track.track.album.images[0].url}
          alt="Album Cover"
        />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
          <p>{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-36 lg:w-64 truncate hidden md:inline">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;

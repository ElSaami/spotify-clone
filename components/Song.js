import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";

function Song({ order, track }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play ({
      uris: [track.track.uri],

    })
  }

  return (
    <div className="grid grid-cols-2 text-gray-500 py-2 px-3 hover:bg-gray-900 rounded-md" onClick={playSong}>
      <div className="flex items-center space-x-4">
        <p className="w-4 text-right cursor-default">{order + 1}</p>
        <img
          className="h-10 w-10"
          src={track.track.album.images[0].url}
          alt="Album Cover"
        />
        <div>
          <p className="w-36 lg:w-64 truncate text-white cursor-default">
            {track.track.name}
          </p>
          {/* Mostrar todos los artistas separados por coma con estilos hover */}
          <p className="w-36 lg:w-full truncate">
            {track.track.explicit && (
              <span className="inline-flex items-center justify-center w-[15px] h-[20px] bg-gray-300 font-semibold rounded-sm text-gray-800 p-0.5 mr-1" title="Explícito">
                E
              </span>
            )}
            {track.track.artists.map((artist, index) => (
              <span key={artist.id}>
                <a
                  href={artist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 hover:underline"
                >
                  {artist.name}
                </a>
                {index < track.track.artists.length - 1 && ', '}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        {/* Agregar la URL del álbum con estilos hover */}
        <p className="w-36 lg:w-64 truncate hidden md:inline">
          <a
            href={track.track.album.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 hover:underline"
          >
            {track.track.album.name}
          </a>
        </p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;

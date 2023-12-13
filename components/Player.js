import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import useSongInfo from "../hooks/useSongInfo";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        console.log("Ahora suena: ", data.body?.item);
        setCurrentTrackId(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  }

  useEffect (() => {
    if (spotifyApi.getAccessToken() && !currentTrackId)
    {
      // Buscamos la info de la cancion
      fetchCurrentSong();
      // Seteamos Volumen
      setVolume(50);
    }
  },[currentTrackIdState, spotifyApi, session]);

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 text-xs md:text-base px-4">
      {/* LEFT */}
      <div className="flex items-center space-x-4">
        <img
          src={songInfo?.album.images[0].url}
          className="hidden md:inline h-10 w-10"
        />
        <div>
          <h3 className="text-white truncate">
            <a
              href={songInfo?.album.external_urls?.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 hover:underline cursor-pointer"
            >
              {songInfo?.name}
            </a>
          </h3>
          <p className="text-gray-500 truncate">
            {songInfo?.artists?.map((artist, index) => (
              <span key={artist.id}>
                <a
                  href={artist.external_urls?.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 hover:underline cursor-pointer"
                >
                  {artist.name}
                </a>
                {index < songInfo?.artists.length - 1 && ', '}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Player;
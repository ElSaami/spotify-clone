import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import useSongInfo from "../hooks/useSongInfo";
import {
  HeartIcon,
  VolumeUpIcon as VolumeDownIcon,
} from "@heroicons/react/outline";
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  VolumeUpIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/solid";
import { debounce } from "lodash";

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
  };

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      // Buscamos la info de la cancion
      fetchCurrentSong();
      // Seteamos Volumen
      setVolume(50);
    }
  }, [currentTrackIdState, spotifyApi, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }

  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => { });
    }, 500),
    []
  );

  const [isImageClicked, setIsImageClicked] = useState(false);

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 grid grid-cols-3 text-xs md:text-base px-4">
      {/* LEFT */}
      <div className="flex items-center space-x-4">
        <img
          src={songInfo?.album.images[0].url}
          className={`hidden md:inline h-10 w-10 cursor-pointer transform ${isImageClicked ? 'scale-150' : 'scale-100'} transition-transform duration-300`}
          onClick={() => setIsImageClicked(!isImageClicked)}
        />

        <div>
          <h3 className="text-white truncate">
            <a
              href={songInfo?.album.external_urls?.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline cursor-pointer"
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
      {/* Center */}
      <div className="text-white flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />

        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
        )}

        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>
      {/* Right */}
      <div className="text-white flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <VolumeDownIcon onClick={() => volume > 0 && setVolume(volume - 10)} className="button" />
        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          onChange={e => setVolume(Number(e.target.value))}
          min={0}
          max={100}
        />
        <VolumeUpIcon onClick={() => volume < 100 && setVolume(volume + 10)} className="button" />
      </div>
    </div>
  );
}

export default Player;
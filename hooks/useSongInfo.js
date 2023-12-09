import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "./useSpotify";
import { useEffect, useState } from "react";

function useSongInfo() {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async() => {
      if (currentTrackId){
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          { 
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            }
          }
        ).then(res => res.json());

        setSongInfo(trackInfo);
      }
    }
    fetchSongInfo();
  }, [currentTrackId, spotifyApi]);

  return songInfo
}

export default useSongInfo
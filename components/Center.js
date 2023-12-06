import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import spotifyApi from "../lib/spotify";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";
import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500"
];

function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [ownerImage, setOwnerImage] = useState(null);
  const [totalDuration, setTotalDuration] = useState(0); // Nuevo estado para la duración total

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then((data) => {
      setPlaylist(data.body);

      // Calcular la duración total de la playlist
      const totalDuration = data.body.tracks.items.reduce((acc, track) => acc + track.track.duration_ms, 0);
      setTotalDuration(totalDuration);

      // Obtener la imagen del propietario
      const ownerUserId = data.body.owner.id;
      spotifyApi.getUser(ownerUserId).then((userData) => {
        setOwnerImage(userData.body.images[0]?.url);
      }).catch((err) => console.log("Error al obtener la imagen del propietario:", err));

    }).catch((err) => console.log("Algo salió mal...", err));
  }, [spotifyApi, playlistId]);

  console.log(playlist);

  return (
    <div className='flex-grow h-screen overflow-y-scroll scrollbar-hide'>
      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 hover:opacity-80 opacity-90 cursor-pointer p-1 pr-2 rounded-full text-white">
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            title="ඞ"
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className='h5- w-5' />
        </div>
      </header>

      {/* Datos de la Playlist */}
      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
        <img
          className="h-44 w-44 shadow-2xl "
          src={playlist?.images?.[0]?.url}
          alt="Foto de Playlist"
          title={playlist?.name}
        />
        <div className="space-y-3">
          <p>{playlist?.type.charAt(0).toUpperCase() + playlist?.type.slice(1)}</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
          <p className="text-sm">{playlist?.description}</p>

          {/* Contenedor flex para elementos en horizontal */}
          <div className="flex items-center space-x-2">
            <img className="rounded-full w-5 h-5 flex" src={ownerImage} alt="Imagen del propietario" />
            <p>{playlist?.owner.display_name}</p><span>&#8226;</span>
            <p>{playlist?.followers.total.toLocaleString()} likes</p><span>&#8226;</span>

            <p>{playlist?.tracks.total} songs,</p>
            <p>Duración total: {millisToMinutesAndSeconds(totalDuration)}</p>
          </div>
        </div>

      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;

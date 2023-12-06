import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
  BeakerIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";



function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  console.log("Elegiste la playlist: ", playlistId);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi])

  return (
    <div className="text-gray-500 p-5 text-sm lg:text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem]">
      <div className="space-y-4">
        {/* Recordatorio */}
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="group-hover:opacity-90">
            <img className="rounded-full w-10 h-10 flex" src={session?.user.image} title={session?.user.name} alt="" />
          </div>
          <div className="group-hover:text-gray-300">
            <h2 className="font-bold">{session?.user.name}</h2>
          </div>
        </div>
        <button className="flex items-center space-x-2 hover:text-white" onClick={() => signOut}>
          <p>Cerrar Sesión</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="w-5 h-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="w-5 h-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="w-5 h-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white" title="Create playlist or folder">
          <PlusCircleIcon className="w-5 h-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white" title="Create playlist or folder">
          <HeartIcon className="w-5 h-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white" title="Create playlist or folder">
          <RssIcon className="w-5 h-5" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlists */}
        {playlists.map((playlist) => (
          <p key={playlist.id} onClick={() => setPlaylistId(playlist.id)} className="cursor-pointer hover:text-white">
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;

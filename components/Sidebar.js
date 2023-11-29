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

function Sidebar() {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="w-5 h-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <BeakerIcon className="w-5 h-5" onClick={() => signOut}/>
          <p>logout</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="w-5 h-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="w-5 h-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900"/>

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
        <hr className="border-t-[0.1px] border-gray-900"/>

        {/* Playlists */}
        <p className="cursor-pointer hover:text-white">Playlist name</p>
        <p className="cursor-pointer hover:text-white">Playlist name</p>
        <p className="cursor-pointer hover:text-white">Playlist name</p>
        <p className="cursor-pointer hover:text-white">Playlist name</p>
        <p className="cursor-pointer hover:text-white">Playlist name</p>
        <p className="cursor-pointer hover:text-white">Playlist name</p>
      </div>
    </div>
  );
}

export default Sidebar;

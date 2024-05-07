import axios from "axios";
import React, { useEffect, useState } from "react";
import  {DropDrownPlaylist}  from "../../utils/modal/DropDrownPlaylist";
import { useDispatch } from "react-redux";
import { UserPlaylistActions} from "../../store/userPlaylistSlice";
import { VideoModal } from "../../utils/modal/VideoModal";
import { Link } from "react-router-dom";
import { CreatePlaylistModal } from "../../utils/modal/CreatePlaylistModal";



function calculateDuration(updatedAtDate) {
  const currentDate = new Date();
  const differenceInMillis = currentDate - updatedAtDate;
  const differenceInSeconds = Math.floor(differenceInMillis / 1000);
  const minutes = Math.floor(differenceInSeconds / 60);
  const hours = Math.floor(differenceInSeconds / 3600);
  const days = Math.floor(differenceInSeconds / (3600 * 24));

  if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else {
    return "Just now";
  }
}

const UserPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const dispatch = useDispatch();
  // console.log(playlists)
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const user_id = localStorage.getItem("user_id");

        const response = await axios.get(`/v1/playlist/user/${user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPlaylists(response.data.message);
        dispatch(UserPlaylistActions.getuserPlaylist(response.data))
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);
  if (playlists.length === 0) {
    return (
      <div className="  w-full h-full mt-32 flex justify-center items-center content-center ">
          <CreatePlaylistModal  action="Create playlist"/>
      </div>
    );
  }
  
 
  return (
    <div className="px-10">
      <h1 className="lg:text-2xl md:text-2xl text-xl font-serif font-semibold my-4">
        My Playlists
      </h1>
      {playlists.map((playlist) => (
        <div
          key={playlist._id}
          className="mb-8 flex gap-4 lg:gap-10 md:gap-8 flex-wrap lg:flex-nowrap md:flex-nowrap"
        >
          <div className="w-1/2 ">
            <div className="w-full  object-cover  bg-blue-gray-300 flex items-center justify-center rounded">
              <Link to={`/viewfullplaylist/${playlist._id}`}>
              <img src="https://cdn3.iconfinder.com/data/icons/listening-music/512/music_6.png" alt="" className="lg:w-72 md:w-80  w-full" />
              </Link>
            </div>
          </div>
          <div className="w-1/2 pt-2">
            <h1 className="text-xl lg:text-3xl md:text-3xl font-semibold mb-1">
              {playlist.name}
            </h1>
            <p className="text-gray-400 text-lg lg:text-2xl md:text-2xl mb-1">
              {playlist.description}
            </p>
            <div className="flex lg:gap-5 md:gap-4 gap-2 content-center items-center mb-1">
              <p className="text-gray-800 text-xs lg:text-xl md:text-sm">
                {calculateDuration(new Date(playlist.updatedAt))}
              </p>
              <p className="text-gray-800 text-xs lg:text-xl md:text-sm">
                {playlist.videos?.length} videos
              </p>
            </div>
          </div>
          <div className="pt-5 cursor-pointer">
            <DropDrownPlaylist playlistId={playlist._id} playlistName={playlist.name} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPlaylist;

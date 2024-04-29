import axios from "axios";
import React, { useEffect, useState } from "react";
import { ThreeDotModal } from "../utils/ThreeDotModal";

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
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

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
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded">
              <p className="text-gray-600 text-2xl font-semibold">
                {playlist.name}
              </p>
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
            <ThreeDotModal />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPlaylist;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowForward } from "react-icons/io";
import axios from 'axios';
import UserPlaylist from '../pages/playlist/UserPlaylist';
import LoadingSpiner from '../utils/modal/LoadingSpiner';
import UserUploadVideo from '../pages/userUploadvideo/UserUploadVideo';
import { UserChannelActions } from '../store/UserChannel';
import { UserUploadedVideoActions } from '../store/getUserUploadedVideo.slice';
import coverImgage from '../assets/coverImg.png'




const UserProfile = ({username,userId}) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [getSubscriber,setGetSubscriber] = useState();// Initialize user state to null
    const [activeTab, setActiveTab] = useState('home'); // State to track active tab
    const { loginData } = useSelector((store) => store.login);
    
  const token = localStorage.getItem("accessToken"); 
  

    useEffect(() => {
       
      
        const fetchData = async () => {
            try {
                const getUserProfile = await axios.get(`/v1/user/c/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(getUserProfile.data.message);
                
                // console.log(getUserProfile.data.message.uploadvideo) // Set user state with data from API response
                dispatch(UserChannelActions.getuserChannel({ userChannel: getUserProfile.data }));
                dispatch(UserUploadedVideoActions.getUserUploadedVideo({video:getUserProfile.data.message.uploadvideo}));
                console(dispatch);
            } catch (error) {
                console.error("Error getting user profile:", error);
            }
        };
      
        fetchData();
    }, [username]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`/v1/subscriptions/c/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setGetSubscriber(response.data);
          } catch (error) {
            console.error("Error fetching subscriber:", error);
          }
        };
    
        fetchData();
      }, [userId, token]);

    if (!user) {
        return <LoadingSpiner/>; 
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
 
    return ( 
        <div>
               {user.coverImage?(<div className='overflow-hidden object-cover px-10 '>
                    <img src={user.coverImage} alt="avatar" className='w-[200vh] h-[30vmin] rounded-xl' />
                </div>):(
                    <div className='overflow-hidden object-cover px-10 ' >
                       <img src={coverImgage} alt="avatar" className='w-[200vh] h-[30vmin] rounded-xl' />
                    </div>
                )

               }
            <section className='flex justify-start lg:pl-20 md:pl-10 lg:p-5 pt-5 w-full  lg:gap-10  md:gap-5 gap-2 '>
            
                <div className='overflow-hidden object-cover'>
                    <img src={user.avatar} alt="avatar" className='rounded-full w-32 h-32 lg:w-52 lg:h-52 md:w-40 md:h-40' />
                </div>
                <div className='lg:pt-5 md:pt-5 '>
                    <h1 className='lg:text-3xl md:text-2xl text-lg font-bold'>{user.fullName}</h1>
                    <div className='flex flex-wrap lg:gap-3 md:gap-2 gap-0 text-gray-500 text-sm lg:my-1'>
                        <p>{user.username}.</p>
                        <p>{getSubscriber?.data[0]?.subscriberCount} subscriber .</p>
                        <p>{user.uploadvideoCount} video</p>
                    </div>
                    <div className='text-gray-500 lg:text-lg md:text-lg text-sm flex gap-1 items-center content-center'>
                        <p>More about this channel</p>
                        <IoIosArrowForward className='text-gray-700' />
                    </div>
                    <div className='lg:my-4 md:my-2 my-1'>
                        <button className='lg:me-2 me-1 bg-gray-300 lg:px-4 px-2 lg:py-2  py-1 text-xs lg:text-lg md:text-base rounded-full shadow-sm hover:bg-blue-400 hover:text-white'>Customize channel</button>
                        <button className='lg:ms-2 bg-gray-300 lg:px-4 px-2 lg:py-2 py-1 text-xs  lg:text-lg  md:text-base rounded-full shadow-sm hover:bg-blue-800 hover:text-white'>Manage videos</button>
                    </div>
                </div>
            </section>
            <section className='flex justify-start lg:pl-32 md:pl-20 pl-10 w-full gap-3 my-2  h-8'>
                <button onClick={() => handleTabChange('home')} className={`font-semibold home-button ${activeTab === 'home' && 'text-blue-500'}`}>Home</button>
                <button onClick={() => handleTabChange('videos')} className={`text-gray-500 font-semibold home-button ${activeTab === 'videos' && 'text-blue-500'}`}>Videos</button>
                <button onClick={() => handleTabChange('playlist')} className={`text-gray-500 font-semibold home-button ${activeTab === 'playlist' && 'text-blue-500'}`}>Playlist</button>
            </section>
            <hr />
            <section>
                {activeTab === 'home' &&
                <>
                 <UserUploadVideo video={user.uploadvideo} />
                <UserPlaylist userId={userId} />
                </>}
                {activeTab === 'videos' && <UserUploadVideo video={user.uploadvideo} />}
                {activeTab === 'playlist' && <UserPlaylist userId={userId} />}
            </section>
        </div>
    );
}

export default UserProfile;

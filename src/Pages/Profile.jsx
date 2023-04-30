import { useContext, useEffect, useState } from 'react';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { FaCreditCard, FaEnvelope, FaLocationArrow, FaPhone, FaUserCircle } from 'react-icons/fa';
import { UserContext } from '../Context/UserContext';
import { ModalContext } from '../Context/ModalContext';
import { API } from '../Config/Api';
import { useQuery } from 'react-query';

const Profile = () => {
  const [userState, _] = useContext(UserContext);
  const [modalState, modalDispatch] = useContext(ModalContext);
  console.log(userState);

  const {
    data: user,
    refetch,
    isLoading,
  } = useQuery('profile', async () => {
    const response = await API.get(`user/${userState.user.id}`);
    return response.data.data;
  });

  return (
    <div className="w-full pt-36">
    {userState && (
      <div className="w-5/12 mx-auto bg-zinc-900 p-5 rounded-md">
        <div className="flex">
          <div className="w-2/3">
            {/* {message && message} */}
            <h2 className="font-bold">Personal Info</h2>
            <div className="flex gap-2 items-center mt-4 mb-2">
              <FaUserCircle className="text-2xl text-red-700" />
              <div>
                <h5 className="text-sm font-bold">{user?.fullname}</h5>
                <p className="text-xs">Full name</p>
              </div>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <FaEnvelope className="text-2xl text-red-700" />
              <div>
                <h5 className="text-sm font-bold">{user?.email}</h5>
                <p className="text-xs">Email</p>
              </div>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <FaCreditCard className="text-2xl text-red-700" />
              <div>
                <h5 className="text-sm font-bold">{user?.subscribe ? 'active' : 'cancel'}</h5>
                <p className="text-xs">Status</p>
              </div>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <BsGenderAmbiguous className="text-2xl text-red-700" />
              <div>
                <h5 className="text-sm font-bold">{user?.gender}</h5>
                <p className="text-xs">Gender</p>
              </div>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <FaPhone className="text-2xl text-red-700" />
              <div>
                <h5 className="text-sm font-bold">{user?.phone}</h5>
                <p className="text-xs">Mobile Phone</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <FaLocationArrow className="text-2xl text-red-700" />
              <div>
                <h5 className="text-sm font-bold">{user?.address}</h5>
                <p className="text-xs">Address</p>
              </div>
            </div>
          </div>
          <div className="w-1/3 flex flex-col justify-between">
            <img src={`http://localhost:5000/uploads/${user?.thumbnail}`} alt="" className="w-full h-full object-cover rounded-sm" />
            <button onClick={() => modalDispatch({ type: 'PROFILE_UPDATE_MODAL' })} className="w-full bg-red-700 text-white mt-2 rounded-md py-2">
              Update Profile
            </button>
          </div>
          </div>
          </div>
          )}
          </div>
  );
};

export default Profile;

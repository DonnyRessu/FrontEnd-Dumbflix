import { useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { API } from '../../Config/Api';
import { AlertSuccess, AlertError } from './AlertCollection';
import { ModalContext } from '../../Context/ModalContext';
import profileDummy from '../../assets/img/preview-dummy.png';
import { UserContext } from '../../Context/UserContext';

const UserProfileUpdate = (props) => {
  const [userState, userDispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    email: '',
    fullname: '',
    gender: '',
    phone: '',
    address: '',
    thumbnail: '',
  });

  useEffect(() => {
    setPreview(userState.user.thumbnail);
    setForm({
      ...form,
      email: userState.user.email,
      fullname: userState.user.fullName,
      gender: userState.user.gender,
      phone: userState.user.phone,
      address: userState.user.address,
      thumbnail: userState.user.thumbnail,
    });
    setIsLoading(false);
  }, []);

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
    });

    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      const formData = new FormData();
      if (form.thumbnail && form.thumbnail[0] instanceof File) {
        formData.set('thumbnail', form.thumbnail[0], form.thumbnail[0].name);
      }

      formData.set('email', form.email);
      formData.set('fullName', form.fullname);
      formData.set('gender', form.gender);
      formData.set('phone', form.phone);
      formData.set('address', form.address);

      const response = await API.patch(`/user-profile/${userState.user.id}`, formData, config);

      console.log('user profile updated', response);

      setMessage(<AlertSuccess message="User Profile Updated!" />);
    } catch (err) {
      setMessage(<AlertError message="Failed to Update profile" />);
      console.log(err);
    }
  });
  return (
    <div className={`${props.className}`}>
      <h2 className="font-semibold mb-5 text-2xl text-white">Profile Update</h2>
      {message && message}
      <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
        <input onChange={handleOnChange} value={form?.email} type="email" name="email" className="w-full mb-3 rounded-md p-2 placeholder-white border-2 border-white bg-zinc-500 focus:outline-none" placeholder="Email" />

        <input onChange={handleOnChange} value={form?.fullname} type="text" name="fullname" className="w-full mb-3 rounded-md p-2 placeholder-white border-2 border-white bg-zinc-500 focus:outline-none" placeholder="FullName" />

        <select onChange={handleOnChange} name="gender" className="w-full mb-3 rounded-md p-1 placeholder-white text-white border-2 border-white bg-zinc-500 focus:outline-none">
          <option value="default" className="hidden">
            Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input onChange={handleOnChange} value={form?.phone} name="phone" type="text" className="w-full mb-3 rounded-md p-2 placeholder-white border-2 border-white bg-zinc-500 focus:outline-none" placeholder="Phone" />

        <textarea onChange={handleOnChange} value={form?.address} name="address" placeholder="Address" className="w-full mb-3 rounded-md p-2 placeholder-white border-2 border-white bg-zinc-500 focus:outline-none"></textarea>

        <div className="flex items-center space-x-6">
          <div className="shrink-0">
            {preview ? (
              <img className="h-16 w-16 object-cover rounded-full" src={preview} alt="Current profile photo" />
            ) : (
              <img className="h-16 w-16 object-cover rounded-full" src={userState.user.thumbnail ? `http://localhost:5000/uploads/${userState.user.thumbnail}` : profileDummy} alt="Current profile photo" />
            )}
          </div>
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4  file:rounded-full file:border-0  file:text-sm file:font-semibold file:bg-red-700 file:text-white hover:file:bg-red-500 " />
          </label>
        </div>

        <button className="w-full bg-red-700 mt-3 py-2 rounded-md mb-2 text-white font-semibold">Update</button>
      </form>
    </div>
  );
};

export default UserProfileUpdate;

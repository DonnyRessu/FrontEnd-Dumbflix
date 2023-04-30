import { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import { API } from '../../Config/Api';
import { AlertSuccess, AlertError } from './AlertCollection';
import { ModalContext } from '../../Context/ModalContext';

const Register = (props) => {
  const [message, setMessage] = useState(null);

  const [_, modalDispatch] = useContext(ModalContext);

  const [form, setForm] = useState({
    email: '',
    password: '',
    fullname: '',
    gender: '',
    phone: '',
    address: '',
  });

  const { email, password, fullname, phone, address } = form;

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post('/register', form);

      console.log('register success : ', response);

      setMessage(<AlertSuccess message="Register Success" />);
      setForm({
        email: '',
        password: '',
        fullname: '',
        gender: '',
        phone: '',
        address: '',
      });
    } catch (err) {
      setMessage(<AlertError message="Failed to register!" />);
      console.log('register failed : ', err);
    }
  });

  return (
    <div className={`${props.className}`}>
      <h2 className="font-semibold mb-5 text-2xl text-white">Register</h2>
      {message && message}
      <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
        <input onChange={handleOnChange} value={email} type="email" name="email" className="w-full mb-3 rounded-md p-2 placeholder-white border-2 border-white bg-zinc-500 focus:outline-none" placeholder="Email" />

        <input onChange={handleOnChange} value={password} type="password" name="password" className="w-full mb-3 rounded-md p-2 placeholder-white border-2 border-white bg-zinc-500 focus:outline-none" placeholder="Password" />

        <input onChange={handleOnChange} value={fullname} type="text" name="fullname" className="w-full mb-3 rounded-md p-2 placeholder-white border-2 border-white bg-zinc-500 focus:outline-none" placeholder="FullName" />

        <select onChange={handleOnChange} name="gender" className="w-full mb-3 rounded-md p-1 placeholder-white text-white border-2 border-white bg-zinc-500 focus:outline-none">
          <option value="default" className="hidden">
            Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input onChange={handleOnChange} value={phone} name="phone" type="text" className="w-full mb-3 rounded-md p-2 placeholder-white border-2 border-white bg-zinc-500 focus:outline-none" placeholder="Phone" />

        <textarea onChange={handleOnChange} value={address} name="address" placeholder="Address" className="w-full mb-3 rounded-md p-2 placeholder-white border-2 border-white bg-zinc-500 focus:outline-none"></textarea>

        <button className="w-full bg-white py-2 rounded-md mb-2 text-red-700 font-semibold">Register</button>

        <p className="text-sm text-center">
          Already have an account? click{' '}
          <span className="font-semibold cursor-pointer" onClick={() => modalDispatch({ type: 'LOGIN_MODAL' })}>
            Here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;

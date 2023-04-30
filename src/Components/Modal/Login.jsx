import { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContext';
import { ModalContext } from '../../Context/ModalContext';
import { useNavigate } from 'react-router';
import { useMutation } from 'react-query';
import { API, setAuthToken } from '../../Config/Api';
import { AlertError, AlertSuccess } from './AlertCollection';

const Login = (props) => {
  const [userState, userDispatch] = useContext(UserContext);
  const [_, modalDispatch] = useContext(ModalContext);
  let navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const response = await API.post('/login', form);
      console.log(response);

      console.log('login success', response);

      // send data to useContext
      userDispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data.data,
      });

      modalDispatch({
        type: 'CLOSE_AUTH_MODAL',
      });

      setAuthToken(response.data.data.token);

      // status check
      if (response.data.data.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/');
      }

      setMessage(<AlertSuccess message="Login Success" />);
    } catch (err) {
      setMessage(<AlertError message="Failed To Login" />);
    }
  });

  return (
    <div className={`${props.className}`}>
      <h2 className="font-semibold mb-5 text-2xl text-white">Login</h2>
      {message && message}
      <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
        <input type="email" onChange={handleOnChange} name="email" value={email} className="w-full mb-3 rounded-md p-2 placeholder-white border-2 border-white bg-zinc-500 focus:outline-none" placeholder="Email" />

        <input type="password" onChange={handleOnChange} name="password" value={password} className="w-full mb-3 rounded-md p-2 placeholder-white border-2 border-white bg-zinc-500 focus:outline-none" placeholder="Password" />

        <button className="w-full bg-red-700 py-2 rounded-md mb-2 text-white font-semibold">Login</button>

        <p className="text-sm text-center">
          Don't have an account? click{' '}
          <span className="font-semibold cursor-pointer" onClick={() => modalDispatch({ type: 'REGISTER_MODAL' })}>
            Here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;

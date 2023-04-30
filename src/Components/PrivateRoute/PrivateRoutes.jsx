import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { ModalContext } from '../../Context/ModalContext';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRouteLogin = () => {
  const [userState] = useContext(UserContext);

  if (!userState.isLogin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export const PrivateRouteUser = () => {
  const [userState] = useContext(UserContext);

  if (userState.user.roles === 'admin') {
    return <Navigate to={'/admin-dashboard'} />;
  }
  return <Outlet />;
};

export const PrivateRouteAdmin = () => {
  const [userState] = useContext(UserContext);

  if (userState.user.roles !== 'admin') {
    return <Navigate to={'/'} />;
  }
  return <Outlet />;
};

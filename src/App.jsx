import React, { createContext, useContext, useEffect, useState } from 'react';
import Navbar from './Components/Global/Navbar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import Movies from './Pages/Movies';
import Shows from './Pages/Shows';
import DetailItem from './Pages/DetailsItem';
import Profile from './Pages/Profile';
import AdminHome from './Pages/AdminHome';
import AdminTransactions from './Pages/AdminTransactions';
import { PrivateRouteAdmin, PrivateRouteLogin, PrivateRouteUser } from './Components/PrivateRoute/PrivateRoutes';
import { UserContext } from './Context/UserContext';
import { API, setAuthToken } from './Config/Api';
import AdminAddMovie from './Pages/AdminAddMovie';
import Payment from './Pages/Payment';
import AdminUpdateMovie from './Pages/AdminUpdateMovie';

const App = () => {
  let navigate = useNavigate();
  const [userState, userDispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (userState.isLogin === false) {
        navigate('/');
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      userDispatch({
        type: 'USER_SUCCESS',
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      console.log('check user failed : ', error);
      userDispatch({
        type: 'AUTH_ERROR',
      });
      setIsLoading(false);
    }
  };

  return isLoading ? null : (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/shows" element={<Shows />} />
        <Route element={<PrivateRouteLogin />}>
          <Route element={<PrivateRouteUser />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/movie-details/:id" element={<DetailItem endpoint={'/film/'} />} />
            <Route path="/shows-details/:id" element={<DetailItem endpoint={'/film/'} />} />
            <Route path="user-payment" element={<Payment />} />
          </Route>
          <Route element={<PrivateRouteAdmin />}>
            <Route path="/admin-movie-details/:id" element={<DetailItem endpoint={'/film/'} />} />
            <Route path="/admin-shows-details/:id" element={<DetailItem endpoint={'/film/'} />} />
            <Route path="/admin-dashboard" element={<AdminHome />} />
            <Route path="/admin-form" element={<AdminAddMovie />} />
            <Route path="/admin-transactions" element={<AdminTransactions />} />
            <Route path="/admin-Update/:id" element={<AdminUpdateMovie />} />
          </Route>
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default App;

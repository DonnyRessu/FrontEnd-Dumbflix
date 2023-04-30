import React, { useContext, useEffect } from 'react';

import heroImage from '../assets/img/shows-bg.png';
import ShowsList from '../Components/Shows/ShowsList';
import Hero from '../Components/Global/Hero';
import { useNavigate } from 'react-router';
import { UserContext } from '../Context/UserContext';

const Shows = () => {
  document.body.classList = 'bg-black';

  const navigate = useNavigate();
  const [userState, modalDispatch] = useContext(UserContext);

  useEffect(() => {
    if (userState.user.role === 'admin') {
      navigate('/admin-dashboard');
    }
  });
  return (
    <React.Fragment>
      <Hero
        heroImage={heroImage}
        heroTitle={'Money Heists'}
        heroCateg={'TV SHOWS'}
        heroYear={2018}
        heroDesc={
          'The first two parts revolve around a long-prepared, multi-day assault on the Royal Mint of Spain In the third part, the surviving robbers are forced out of hiding, and with the help of new members, they plan and perform an assault on the Bank of Spain. The fourth part continues this'
        }
      />

      <ShowsList linkTo={'/shows-details/'} topComp={true} className={'pb-5'} />
    </React.Fragment>
  );
};

export default Shows;

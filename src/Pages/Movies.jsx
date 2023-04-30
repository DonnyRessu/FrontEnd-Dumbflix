import React, { useContext, useEffect } from 'react';
import MovieList from '../Components/Movies/MovieList';
import heroImage from '../assets/img/movies-bg.png';
import Hero from '../Components/Global/Hero';
import { useNavigate } from 'react-router';
import { UserContext } from '../Context/UserContext';

const Movies = () => {
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
        heroTitle={'Joker'}
        heroCateg={'Movie'}
        heroYear={2019}
        heroDesc={
          'A socially inept clown for hire - Arthur Fleck aspires to be a stand up comedian among his small job working dressed as a clown holding a sign for advertising. He takes care of his mother- Penny Fleck, and as he learns more about his mental illness, he learns more about his past. Dealing with all the negativity and bullying from society he heads downwards on a spiral, in turn showing how his alter ego "Joker", came to be.'
        }
      />

      <MovieList linkTo={'/movie-details/'} topComp={true} className={'pb-5'} />
    </React.Fragment>
  );
};

export default Movies;

import { useQuery } from 'react-query';
import ApiConfig from '../../Config/ApiConfig';
import useFetch from '../../Config/useFetch';
import CardItem from '../Global/CardItem';
import { API } from '../../Config/Api';
import { useEffect, useState } from 'react';

const MovieList = (props) => {
  const [data, setData] = useState([]);
  const {
    data: movies,
    refetch,
    isLoading,
  } = useQuery('movies', async () => {
    const response = await API.get('/films');
    return response.data.data;
  });

  useEffect(() => {
    setData(movies?.filter((index) => index.category.id == 1));
  }, [movies]);

  return (
    <div className={`${props.className} ${props.topComp ? 'bg-gradient-to-b from-black via-black to-zinc-900' : 'bg-zinc-900'} text-white`}>
      <div className="container mx-auto lg:px-8">
        <h2 className="font-semibold text-xl mb-5">Movies</h2>

        <div className={`${props.slides ? 'carousel rounded-box' : 'grid grid-cols-6 gap-x-52'}`}>
          {isLoading && <div>Loading...</div>}
          {data
            ? data.map((index) => <CardItem movieId={index.id} linkTo={`${props.linkTo}${index.id}`} key={index.id} title={index.title} year={index.year} className={`${props.slides ? 'carousel-item px-5' : ''} w-48`} thumbn={`${index.thumbnail}`} />)
            : null}
        </div>
      </div>
    </div>
  );
};

export default MovieList;

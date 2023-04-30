import { useEffect, useState } from 'react';
import ApiConfig from '../../Config/ApiConfig';
import useFetch from '../../Config/useFetch';
import CardItem from '../Global/CardItem';
import { useQuery } from 'react-query';
import { API } from '../../Config/Api';

const ShowsList = (props) => {
  // const { data, loading, error } = useFetch('/tv/top_rated');
  // const { tmdb_w500Image } = ApiConfig;

  const [data, setData] = useState('');
  const {
    data: shows,
    refetch,
    isLoading,
  } = useQuery('moviesCache', async () => {
    const response = await API.get('/films');
    return response.data.data;
  });

  useEffect(() => {
    setData(shows?.filter((index) => index.category.id == 2));
  }, [shows]);
  return (
    <div className={`text-white ${props.className} ${props.topComp ? 'bg-gradient-to-b from-black via-black to-zinc-900' : 'bg-zinc-900'}`}>
      <div className="container mx-auto lg:px-8">
        <h2 className="font-semibold text-lg mb-3">TV Shows</h2>
        <div className={`${props.slides ? 'carousel rounded-box' : 'grid grid-cols-6 gap-x-52'}`}>
          {data
            ? data?.map((index) => <CardItem movieId={index.id} linkTo={`${props.linkTo}${index.id}`} key={index.id} title={index.title} year={index.year} className={`${props.slides ? 'carousel-item px-5' : ''} w-48`} thumbn={`${index.thumbnail}`} />)
            : null}
        </div>
      </div>
    </div>
  );
};

export default ShowsList;

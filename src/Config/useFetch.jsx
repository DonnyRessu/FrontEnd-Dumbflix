import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import ApiConfig from './ApiConfig';

const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { tmdb_ApiKey, tmdb_baseUrl } = ApiConfig;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(`${tmdb_baseUrl}${endpoint}`, {
        params: {
          api_key: tmdb_ApiKey,
          append_to_response: 'videos',
        },
      });

      return response;
    };

    fetchData()
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};

export default useFetch;

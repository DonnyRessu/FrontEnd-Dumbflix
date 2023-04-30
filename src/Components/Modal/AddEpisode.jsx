import { useContext, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { API } from '../../Config/Api';
import { AlertSuccess, AlertError } from './AlertCollection';
import { ModalContext } from '../../Context/ModalContext';
import { useLocation, useNavigate, useParams } from 'react-router';

const AddEpisode = (props) => {

  const navigate = useNavigate()
  const id = useParams()
  const location = useLocation()
  const movieId = location.pathname.split('/')[2]
  console.log(movieId)
  const [message, setMessage] = useState(null);
  const [_, modalDispatch] = useContext(ModalContext);
  const [form, setForm] = useState({
    image: '',
    title: '',
    linkFilm: '',
    movie_id: movieId,
  });


  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
    });
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
      formData.set('image', form.image[0], form.image[0].name);
      formData.set('title', form.title);
      formData.set('linkfilm', form.linkFilm);
      formData.set('film_id', form.movie_id);

      console.log("asu raimu",FormData)

      const response = await API.post('/episode', formData, config);
      console.log('add episode success', response);
      
      alert("Succes bro")

      modalDispatch({
        type: 'CLOSE_AUTH_MODAL'
      })

    } catch (err) {
      console.log('add episode failed', err);
    }
  });

  return (
    <div className={`${props.className}`}>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold mb-5 text-2xl text-white">Add Episode</h2>
      </div>
      {message && message}
      <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
        <div className="flex gap-x-3">
          <input onChange={handleOnChange} className="w-3/4 mb-3 rounded-md p-2 placeholder-white border-2 border-white bg-zinc-500 focus:outline-none" type="text" name="title" placeholder="Title" />
          <input onChange={handleOnChange} className="w-1/4 mb-3 rounded-md p-2 placeholder-white border-2 border-white bg-zinc-500 focus:outline-none file-input-ghost file:text-white" type="file" name="image" id="" />
        </div>
        <input onChange={handleOnChange} className="w-full mb-3 rounded-md p-2 placeholder-white border-2 border-white bg-zinc-500 focus:outline-none" type="text" name="linkFilm" id="" placeholder="Link Video" />
        <button className="w-full bg-white py-2 rounded-md mb-2 text-red-700 font-semibold">Save</button>
      </form>
    </div>
  );
};

export default AddEpisode;

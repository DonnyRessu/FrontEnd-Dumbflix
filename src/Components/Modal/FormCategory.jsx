import { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import { API } from '../../Config/Api';
import { AlertSuccess, AlertError } from './AlertCollection';
import { ModalContext } from '../../Context/ModalContext';
import { useNavigate } from 'react-router';

const FormCategory = (props) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState(null);

  const [_, modalDispatch] = useContext(ModalContext);

  const handleOnChange = (e) => {
    setCategory(e.target.value);
  };

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const body = JSON.stringify({ name: category });

      const response = await API.post('/category', body, config);

      console.log('succes insert data', response);
      setMessage(<AlertSuccess message="New Category Added!" />);

      modalDispatch({
        type: 'CLOSE_AUTH_MODAL',
      });
    } catch (err) {
      setMessage(<AlertError message="Failed to add category" />);
      console.log('Failed to add category : ', err);
    }
  });

  return (
    <div className={`${props.className}`}>
      <h2 className="font-semibold mb-5 text-2xl text-white">Add Category</h2>
      {message && message}
      <form onSubmit={(e) => handleOnSubmit.mutate(e)}>
        <input onChange={handleOnChange} value={category} type="category" name="category" className="w-full mb-3 rounded-md p-2 placeholder-white border-2 border-white bg-zinc-500 focus:outline-none" placeholder="Category" />

        <button className="w-full bg-white py-2 rounded-md mb-2 text-red-700 font-semibold">Save</button>
      </form>
    </div>
  );
};

export default FormCategory;

import { Link } from 'react-router-dom';
import React, { useContext,} from 'react';
import { UserContext } from '../../Context/UserContext'
import { API } from '../../Config/Api';
import { useMutation } from 'react-query';
import Swal from 'sweetalert2';

const   CardItem = (props) => {
  const [state] = useContext(UserContext)

  const handleOnDelete = useMutation(async (movieId) => {
    try {
      console.log(movieId)
      await API.delete(`/film/${movieId}`);
      // alert("delete success")
      Swal.fire({
        icon:'success',
        title: 'DELETE SUCCESS !!',
        showConfirmButton: false,
        timer: 1500
    })
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  });
  // console.log(movieId)
// console.log("id movie nih : ", props.movieId)
// console.log("id movie nih : ", props.title)
  

  const UpdateDelete = () => {
    return (
      <React.Fragment>
        <div className='flex justify-between mt-2'>
          <Link to={`/admin-update/${props.movieId}`}><button className='bg-white text-red-500 px-5 rounded'>Update</button></Link>
          <button onClick={() => handleOnDelete.mutate(props.movieId)} className='bg-red-500 text-white px-5 rounded'>Delete</button>
        </div>
      </React.Fragment>
    )
  }
  return (
    <div className={`flex flex-col ${props.className}`}>
      <Link to={props.linkTo}>
        <img src={props.thumbn} className=" mb-2 rounded-md" />
      </Link>
      <h5 className="font-semibold">{props.title}</h5>
      <p className="text-sm">{props.year}</p>
      {state.isLogin && state.user.roles === "admin" && <UpdateDelete/>}
    </div>
  );
};

export default CardItem;

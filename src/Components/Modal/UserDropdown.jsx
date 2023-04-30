import { Link } from 'react-router-dom';
import { BsFillTriangleFill } from 'react-icons/bs';
import { FaRegUser, FaFileInvoiceDollar } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

const UserDropdown = (props) => {
  const [_, userDispatch] = useContext(UserContext);
  return (
    <div className="relative">
      <div className={`absolute top-full z-20 right-9 text-zinc-800 mt-1`}>
        <BsFillTriangleFill />
      </div>
      <div className={`absolute w-40 top-full right-7 mt-4 rounded-md py-2 bg-zinc-800 z-10`}>
        <Link to={'/profile'} className="flex items-center cursor-pointer gap-2 font-semibold px-5 mb-2">
          <FaRegUser className="text-xl text-red-700" /> Profile
        </Link>
        <Link to={'/user-payment'} className="flex items-center cursor-pointer gap-2 font-semibold px-5 mb-2">
          <FaFileInvoiceDollar className="text-xl text-red-700" /> Pay
        </Link>
        <hr className="w-full h-2" />
        <Link onClick={() => userDispatch({ type: 'LOGOUT' })} className="flex items-center cursor-pointer gap-2 font-semibold px-5">
          <IoLogOut className="text-xl text-red-700" /> Logout
        </Link>
      </div>
    </div>
  );
};

export default UserDropdown;

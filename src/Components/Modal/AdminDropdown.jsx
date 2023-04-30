import { Link } from 'react-router-dom';
import { BsFillTriangleFill } from 'react-icons/bs';
import { FaRegUser, FaFileInvoiceDollar, FaFilm, FaMoneyBillWave } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import AdminTransactions from '../../Pages/AdminTransactions';

const AdminDropdown = (props) => {
  const [userState, userDispatch] = useContext(UserContext);
  return (
    <div className="relative">
      <div className={`absolute top-full z-20 right-9 text-zinc-800 mt-1`}>
        <BsFillTriangleFill />
      </div>
      <div className={`absolute w-40 top-full right-7 mt-4 rounded-md py-2 bg-zinc-800 z-10`}>
        <Link to={'/admin-dashboard'} className="flex items-center cursor-pointer gap-2 font-semibold px-5 mb-2">
          <FaFilm className="text-xl text-red-700" /> Movie
        </Link>
        <Link to={'/admin-transactions'} className="flex items-center cursor-pointer gap-2 font-semibold px-5 mb-2">
          <FaMoneyBillWave className="text-xl text-red-700" /> Transaction
        </Link>
        <hr className="w-full h-2" />
        <Link onClick={() => userDispatch({ type: 'LOGOUT' })} className="flex items-center cursor-pointer gap-2 font-semibold px-5">
          <IoLogOut className="text-xl text-red-700" /> Logout
        </Link>
      </div>
    </div>
  );
};

export default AdminDropdown;

import React, { useState } from 'react';
import { IoMdArrowDropdownCircle } from 'react-icons/io';
import { API } from '../Config/Api';
import { useQuery } from 'react-query';
import { data } from 'autoprefixer';


const AdminTransactions = () => {
  const [dropButton, setDropButton] = useState(false);
  const { data: transaction } = useQuery('transactionDetailCache', async () => {
    const response = await API.get(`/transactions`);
    return response.data.data;
  });
  

  return (
    <React.Fragment>
      <div className="px-20 bg-black py-10">
        <div className="container mx-auto py-20 h-[100vh]">
          <h2 className="font-bold text-white text-lg mb-5">Incoming Transaction</h2>
          <table className="table w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Users</th>
                <th>Remaining Active</th>
                <th>Status User</th>
                <th>Status Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transaction?.map((trans, id) => (
              <tr key={id}>
                <td>{trans.id}</td>
                <td>{trans?.user.fullname}</td>
                <td>{trans?.endDate.slice(0,10)}</td>
                <td>{trans?.user.subscribe ? "subscribe" : "not subscribe"}</td>
                <td>{<StatusPayment status={trans.status}/>}</td>
                <td className="relative">
                  <button className="pl-3" onClick={() => setDropButton(!dropButton)}>
                    <IoMdArrowDropdownCircle className="text-2xl text-sky-500" />
                  </button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

const StatusPayment = ({ status }) => {
  switch (status) {
    case "pending":
      return <span className='text-orange-500'>Pending</span>
    case "success":
      return <span className='text-green-500'>Success</span>
    case "failed":
      return <span className='text-red-500'>Failed</span>
  }
}

export default AdminTransactions;

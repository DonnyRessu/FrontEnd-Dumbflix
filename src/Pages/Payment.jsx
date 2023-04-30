import React from 'react';
import { API } from '../Config/Api';
import { useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../Context/UserContext';

const Payment = () => {
  const [state] = useContext(UserContext)
    let navigate = useNavigate();

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = 'SB-Mid-client-RNEvnCgl4KBb-JPV'

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
        document.body.removeChild(scriptTag);
    };
}, []);
const handleBuy = useMutation(async (e) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        const data = {
            seller_id: state.user.id,
            price: e.price,
        };

        const body = JSON.stringify(data);

        const response = await API.post("/transaction", body, config);
        console.log("transaction success :", response);

        const token = response.data.data.token;
        window.snap.pay(token, {
            onSuccess: function (result) {
                /* You may add your own implementation here */
                console.log(result);
                navigate("/profile");
            },
            onPending: function (result) {
                /* You may add your own implementation here */
                console.log(result);
                navigate("/profile");
            },
            onError: function (result) {
                /* You may add your own implementation here */
                console.log(result);
                navigate("/profile");
            },
            onClose: function () {
                /* You may add your own implementation here */
                alert("you closed the popup without finishing the payment");
            },
        });
    } catch (error) {
        console.log("transaction failed : ", error);
    }
})
  return (
    <React.Fragment>
      <div className="px-8 py-24 container mx-auto h-[100vh]">
        <h2 className="text-center text-3xl font-bold">Choose You're plan!</h2>
        <div className="flex gap-x-20 px-20 mt-10">
          <div className="w-1/3 flex flex-col justify-between bg-zinc-800 shadow-md rounded-md p-3">
            <h3 className="font-bold text-md mb-5">Regular</h3>
            <p className="font-bold text-red-700 text-2xl mb-3">Rp 200K </p>
            <p className="text-justify">regular plan for a week, you can get access for limited thousand tv series and movies, auto renewal every week. cannot be cancel unless you close you're bank account.</p>
            <button onClick={() => handleBuy.mutate({ price: 200000 })} className="bg-red-700 text-white mt-5 py-2 rounded-md">Buy plan</button>
          </div>

          <div className="w-1/3 flex flex-col justify-between bg-zinc-800 shadow-md rounded-md p-3">
            <h3 className="font-bold text-md mb-5">Mid plan</h3>
            <p className="font-bold text-red-700 text-2xl mb-3">Rp 350K </p>
            <p className="text-justify">Best plan for a month, you can get access for limited thousand tv series and movies, but you're account could get banned in less of a month and remember we're not giving any warranty.</p>
            <button onClick={() => handleBuy.mutate({ price: 350000 })} className="bg-red-700 text-white mt-5 py-2 rounded-md">Buy plan</button>
          </div>

          <div className="w-1/3 flex flex-col justify-between bg-zinc-800 shadow-md rounded-md p-3">
            <h3 className="font-bold text-md mb-5">King Box</h3>
            <p className="font-bold text-red-700 text-2xl mb-3">Rp 600K </p>
            <p className="text-justify">King only plan, same as before but you'll never know when your subscriptions over and when we take you're money.</p>
            <button onClick={() => handleBuy.mutate({ price: 600000 })} className="bg-red-700 text-white mt-5 py-2 rounded-md">Buy plan</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Payment;

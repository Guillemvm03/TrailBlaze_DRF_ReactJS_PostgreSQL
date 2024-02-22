import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRent } from "../../../hooks/useRent";

const RentalHistory = () => {
    const { userRents, useGetRents } = useRent();

    useEffect(() => {
        useGetRents(true);
    },[]);

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <h1 className="text-2xl font-bold my-4">Rental History</h1>
                    <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                        Get Bills
                    </button>
                </div>
                <div className="mt-8">
                    {userRents && userRents.map((rent, index) => (
                        <div key={index} className="flex flex-col md:flex-row border-b border-gray-400 py-4">
                            <div className="flex-shrink-0">
                                <img src={rent.imageUrl || "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="Imagen del producto" className="w-32 h-32 object-cover"/>
                            </div>
                            <div className="mt-4 md:mt-0 md:ml-6">
                                <h2 className="text-lg font-bold">{rent.productTitle}</h2>
                                <p className="mt-2 text-gray-600"><b>Start date:</b> {rent.start_date}</p>
                                <p className="mt-2 text-gray-600"><b>End date:</b> {rent.end_date}</p>

                                <div className="mt-4 flex items-center">
                                    <span className="ml-auto font-bold">Amount: ${rent.amount}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
};

export default RentalHistory;

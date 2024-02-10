import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import CreateItemModal from "../../../components/admin/modals/CreateItemModal"; 
// import { useBikes } from "../../../hooks/useBikes";
// import BikesTableList from "../../../components/admin/Bikes/TableListBikes";


const UsersDashboard = () => {
    const navigate = useNavigate();
    // const { useCreateBike } = useBikes(); 

    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

    // const handleCreateBike = (data) => {
       
    //     useCreateBike(data);
    // };

    return (
        <div className="usersDashboard">
            {/* <Card className="">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Bikes DashBoard
                </h5>
                <CreateItemModal
                    operation="create"
                    onSubmit={handleCreateBike}
                    initialValues={{ bike_type: "", gps: "" }}
                    fields={[
                    { name: "bike_type", label: "Bike Type" },
                    { name: "gps", label: "GPS" }
                    ]}
                />
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                </p>
                <BikesTableList />
            </Card> */}
        </div>
    );
};

export default UsersDashboard;

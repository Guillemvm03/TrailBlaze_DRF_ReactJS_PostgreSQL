import React, { useEffect } from "react";
import { Card } from "flowbite-react";
import { useParams } from "react-router-dom";
import { useStations } from "../../../hooks/useStations";
import TableListSlots from "../../../components/admin/Stations/TableListSlots";
import { useSlots } from "../../../hooks/useSlots";

const StationDashboard = () => {

    const { slug } = useParams();
    const { oneStation, useGetOneStation } = useStations();

    useEffect(function () {
        useGetOneStation(slug);
    }, []);

    return (
        <div className="stationDashboard">
            <Card className="">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    DashBoard
                </h5>
                
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Name Station: {oneStation.station_name}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Address: {oneStation.address}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Status: {oneStation.description}
                </p>

            </Card>
            <Card className="my-3">
                <TableListSlots station_slug={slug}></TableListSlots>
            </Card>
        </div>
    )
}

export default StationDashboard
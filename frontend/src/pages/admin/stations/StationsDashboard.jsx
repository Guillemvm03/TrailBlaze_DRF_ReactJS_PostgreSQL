import React from "react";
import './StationsDashboard.scss';
import { Card } from "flowbite-react";
import CreateStationModal from "../../../components/admin/Stations/modals/CreateStationModal";
import { useStations } from "../../../hooks/useStations";
import TableListStations from "../../../components/admin/Stations/TableListStations";

const StationsDashboard = () => {
    const { useCreateStation } = useStations();

    return (
        
        <div className="stationsDashboard">
        {}

            <Card className="">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Stations DashBoard
                </h5>
                <CreateStationModal createStation={(data) => useCreateStation(data)}></CreateStationModal>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                </p>
                <TableListStations></TableListStations>
            </Card>

        </div>
    )
}

export default StationsDashboard
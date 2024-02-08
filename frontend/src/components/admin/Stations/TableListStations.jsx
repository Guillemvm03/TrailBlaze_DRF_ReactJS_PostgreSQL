
import { Button, Table } from 'flowbite-react';
import { useStations } from '../../../hooks/useStations';
import DeleteModal from '../modals/DeleteModal';
import CreateStationModal from './modals/CreateStationModal';
import { useNavigate } from 'react-router-dom';

function TableListStations() {

    const { stations, setStations, useDeleteStation, useUpdateStation } = useStations();
    // Navigates
    const navigate = useNavigate();

    const rows = stations.map((station) => (
      <Table.Row
        key={station.slug}
        className="bg-white dark:border-gray-700 dark:bg-gray-800"
      >
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {station.station_name}
        </Table.Cell>
        {/* Agrega las celdas adicionales según tus necesidades */}
        <Table.Cell>{station.lat}</Table.Cell>
        <Table.Cell>{station.lng}</Table.Cell>
        <Table.Cell>{station.description}</Table.Cell>
        <Table.Cell>{station.capacity}</Table.Cell>
        <Table.Cell className="flex">
          <Button color="light" onClick={() => navigate(station.slug)}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"/>
              <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
            </svg>
          </Button>
          &nbsp;
          <CreateStationModal
            station={station}
            updateStation={(res) => useUpdateStation(res)}
          ></CreateStationModal>
          &nbsp;
          <DeleteModal 
            sendData={(res) => useDeleteStation(station.slug)}
          ></DeleteModal>
        </Table.Cell>
      </Table.Row>
    ));


    return (
        <div className="overflow-x-auto">
            <Table>
                <Table.Head>
                    <Table.HeadCell>Station name</Table.HeadCell>
                    <Table.HeadCell>Latitud</Table.HeadCell>
                    <Table.HeadCell>Longitud</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Slots</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {rows}
                </Table.Body>
            </Table>
        </div>
    );
}

export default TableListStations
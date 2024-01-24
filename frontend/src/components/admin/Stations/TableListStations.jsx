
import { Table } from 'flowbite-react';
import { useStations } from '../../../hooks/useStations';
import DeleteStationModal from './modals/DeleteStationModal';
import CreateStationModal from './modals/CreateStationModal';

function TableListStations() {

    const { stations, setStations, useDeleteStation, useUpdateStation } = useStations();

    const rows = stations.map(station => (
        <Table.Row key={station.slug} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {station.station_name}
            </Table.Cell>
            {/* Agrega las celdas adicionales según tus necesidades */}
            <Table.Cell>{station.lat}</Table.Cell>
            <Table.Cell>{station.lng}</Table.Cell>
            <Table.Cell>{station.description}</Table.Cell>
            <Table.Cell>{station.capacity}</Table.Cell>
            <Table.Cell>
                <DeleteStationModal sendData={(res) => useDeleteStation(station.slug)}></DeleteStationModal>
                <CreateStationModal station={station} updateStation={(res) => useUpdateStation(res)}></CreateStationModal>
            </Table.Cell>
        </Table.Row>
    ));


    return (
        <div className="overflow-x-auto">
            <Table>
                <Table.Head>
                    <Table.HeadCell>Product name</Table.HeadCell>
                    <Table.HeadCell>Latitud</Table.HeadCell>
                    <Table.HeadCell>Longitud</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Slots</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {rows}
                </Table.Body>
            </Table>
        </div>
    );
}

export default TableListStations
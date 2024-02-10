
import { Button, Table } from 'flowbite-react';
import { useBikes } from '../../../hooks/useBikes';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../modals/DeleteModal';
import CreateItemModal from '../modals/CreateItemModal';

function TableListBikes() {
    const { bikes, setBikes, useDeleteBike, useUpdateBike} = useBikes();


    const handleUpdate = (bikeData) => {
        useUpdateBike(bikeData);
    };

    const rows = bikes.map((bike) => (
            <Table.Row
            key={bike.slug}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {bike.id}
            </Table.Cell>
            <Table.Cell>{bike.bike_type}</Table.Cell>
            <Table.Cell>{bike.gps}</Table.Cell>
            <Table.Cell>{bike.status}</Table.Cell>
            <Table.Cell className="flex">
                {/* <Button color="light" onClick={() => navigate(bike.slug)}>
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"/>
                    <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg>
                </Button> */}
                &nbsp;

                <DeleteModal 
                sendData={(res) => useDeleteBike(bike.slug)}
                ></DeleteModal>
                &nbsp;
                <CreateItemModal
                    operation="update" 
                    onSubmit={handleUpdate} 
                    initialValues={bike} 
                    fields={[
                        { name: "bike_type", label: "Bike Type" },
                        { name: "gps", label: "GPS" }
                    ]} // Campos necesarios para la actualización
                />
                
            </Table.Cell>
            </Table.Row>
        ));

    return(
        <div className="overflow-x-auto">
            <Table>
                <Table.Head>
                    <Table.HeadCell>Id</Table.HeadCell>
                    <Table.HeadCell>Bike type</Table.HeadCell>
                    <Table.HeadCell>gps</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {rows}
                </Table.Body>
            </Table>
        </div>
    );
}

export default TableListBikes;
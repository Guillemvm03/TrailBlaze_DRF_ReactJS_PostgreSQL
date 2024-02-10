
import { Button, Table } from 'flowbite-react';
import { useSlots } from '../../../hooks/useSlots';
import DeleteModal from '../modals/DeleteModal';
import UpdateSlotModal from './modals/UpdateSlotModal';

function TableListStations({ station_slug }) {

    const { slots, useCreateSlot, updateSlot, useDeleteSlot } = useSlots(station_slug)

    const rows = slots.map(slot => (
        <Table.Row key={slot.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {slot.id}
            </Table.Cell>
            {/* Agrega las celdas adicionales según tus necesidades */}
            <Table.Cell>{slot.bike_id ? slot.bike_id : 'Vacia' }</Table.Cell>
            <Table.Cell>{slot.bike_slug ? slot.bike_slug : 'Vacia' }</Table.Cell>
            <Table.Cell>{slot.status}</Table.Cell>
            <Table.Cell className='flex'>
                <UpdateSlotModal slot={slot} updateSlot={(res) => updateSlot(res)}></UpdateSlotModal>
                &nbsp;
                <DeleteModal sendData={(res) => useDeleteSlot(station_slug, slot.id)}></DeleteModal>
            </Table.Cell>
        </Table.Row>
    ));



    return (
        <div className="overflow-x-auto">
            <Button color='success' className='mb-3' onClick={() => useCreateSlot(station_slug)}>Add Slot</Button>
            <Table>
                <Table.Head>
                    <Table.HeadCell>Id</Table.HeadCell>
                    <Table.HeadCell>Bike Id</Table.HeadCell>
                    <Table.HeadCell>Bike Slug</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
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
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';

const CreateStationModal = ({ createStation, updateStation, station = {
    id: '', slug: '', station_name: '', description: '', address: '', lat: '', lng: '', capacity: '', image: ''
} }) => {
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState(station.slug != '' ? station.station_name : 'Station Repsol');
    const [lat, setLat] = useState(station.slug != '' ? station.lat : '38.81843793181861');
    const [long, setLong] = useState(station.slug != '' ? station.lng : '-0.604933473737143');
    const [address, setAddress] = useState(station.slug != '' ? station.address : 'Address 3');
    const [description, setDescription] = useState(station.slug != '' ? station.description : 'Avaible');
    const [capacity, setCapacity] = useState(station.slug != '' ? station.capacity : 10);
    const [image, setImage] = useState(station.slug != '' ? station.image : 'https://picsum.photos/200/300');

    function onCloseModal() {
        setOpenModal(false);
        setLat('');
        setLong('');
        setDescription('');
        setName('');
        setAddress('');
        setCapacity('');
        setImage('');
    }

    function create() {
        createStation({
            station_name: name,
            description: description,
            address: address,
            lat: lat,
            lng: long,
            capacity: capacity,
            image: image
        })
        setOpenModal(false)
    }

    function update() {
        updateStation({
            id: station.id,
            slug: station.slug,
            station_name: name,
            description: description,
            address: address,
            lat: lat,
            lng: long,
            capacity: capacity,
            image: image
        })
        setOpenModal(false)
    }

    const buttonOpen = (station.slug != '' ?
        <Button onClick={() => setOpenModal(true)}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279" />
            </svg>
        </Button>
        :
        <Button color='success' onClick={() => setOpenModal(true)}>
            New&nbsp;&nbsp;<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </Button>)

    return (
        <div>
            {buttonOpen}
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create a StationBike</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Name Station" />
                            </div>
                            <TextInput
                                id="name"
                                placeholder="Station name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="lat" value="Your latitude" />
                            </div>
                            <TextInput id="lat" type="lat" value={lat} onChange={(event) => setLat(event.target.value)} required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="long" value="Your longitude" />
                            </div>
                            <TextInput id="long" type="long" value={long} onChange={(event) => setLong(event.target.value)} required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="address" value="Address" />
                            </div>
                            <TextInput id="address" type="address" value={address} onChange={(event) => setAddress(event.target.value)} required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="description" value="description" />
                            </div>
                            <TextInput id="description" type="description" value={description} onChange={(event) => setDescription(event.target.value)} required />
                        </div>
                        <div className="w-full">
                            <Button onClick={() => {
                                station.slug != '' ? update() : create()
                            }}>{station.slug != '' ? 'Update station' : 'Create station'}</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CreateStationModal;
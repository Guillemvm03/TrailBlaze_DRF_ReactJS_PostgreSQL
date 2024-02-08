import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';

const UpdateSlotModal = ({ updateSlot, slot = { id: '', bike_slug: null, status: '' } }) => {
    const [openModal, setOpenModal] = useState(false);
    const [bike, setBike] = useState(slot.bike_slug ? slot.bike_slug : '');
    const [status, setStatus] = useState(slot.status ? slot.status : 'free');
  
    function onCloseModal() {
        setOpenModal(false);
        setBike('');
        setStatus('free');
    }

    function update() {
        updateSlot({
            id: slot.id,
            bike_slug: bike,
            status: status
        })
        setOpenModal(false)
    }

    const buttonOpen = 
        <Button onClick={() => setOpenModal(true)}>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279" />
            </svg>
        </Button>

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
                                <Label htmlFor="slug" value="Bike Slug" />
                            </div>
                            <TextInput
                                id="slug"
                                placeholder="Bike slug"
                                value={bike}
                                onChange={(event) => setBike(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="status" value="status" />
                            </div>
                            <TextInput id="status" type="status" value={status} onChange={(event) => setStatus(event.target.value)} required />
                        </div>
                        <div className="w-full">
                            <Button onClick={() => update()}>Actualizar slot</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default UpdateSlotModal;
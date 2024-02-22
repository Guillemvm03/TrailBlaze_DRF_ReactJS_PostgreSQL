import React from 'react';
import { Modal, Button } from 'flowbite-react';
import { useState } from 'react';

function RentalModal({ sendData, slot }) {
    const [openModal, setOpenModal] = useState(false);

    function rentalModal() {
        sendData(true)
    }

    return (
        <>
        <Button className='inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800' onClick={() => setOpenModal(true)}>
            Rent
      </Button>

        <Modal
            show={openModal}
            onClose={() => setOpenModal(false)} 
            popup
        >
            <Modal.Header>
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Confirm Rental
                    </h3>
                    <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => setOpenModal(false)}
                    >
                        <svg 
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="p-4 md:p-5">
                    <img
                        src="https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Bike"
                        className="w-full mb-4 rounded-lg"
                    />
                    <p className='text-gray-900 dark:text-gray-300'>Slot: {slot.id}</p>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {slot.bike_slug}
                    </h3>
                    <p className="text-gray-900 dark:text-gray-300">
                        <b>Price:</b> <span className="text-green-500 text-lg">$0.25 </span>initial charge, then <span className="text-green-500 text-lg">$0.50</span> per hour
                    </p>
                    <hr className="my-4" />
                    
                    <p className="text-gray-900 dark:text-gray-300">
                        Are you sure you want to rent this bike?
                    </p>
                    <div className="flex justify-end mt-6">
                        <Button color="success" onClick={() => {setOpenModal(false); rentalModal()}}>
                            Yes, Rent
                        </Button>
                        <Button color="gray" className="ml-3" onClick={() => setOpenModal(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default RentalModal;

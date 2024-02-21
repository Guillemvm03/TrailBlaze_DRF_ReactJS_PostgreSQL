import React, { useState, useEffect } from 'react';
import { Card, Dropdown, DropdownItem, Modal, Button } from 'flowbite-react';
import RentalModal from '../../../Modals/RentalModal'; 
import LeaveBikeModal from '../../../Modals/LeaveBikeModal';
import { useRent } from '../../../../../hooks/useRent';
import { useAuth } from '../../../../../hooks/useAuth';
import { useSlots } from '../../../../../hooks/useSlots';

function SlotCard({ slot }) {

    const { useStartRent, useEndRent, useGetRent, userRent, setUserRent } = useRent();
    const { user } = useAuth();
    const { slots, setSlots } = useSlots();

    const text = slot.status === 'free'
        ? 'Empty slot'
        : slot.status === 'Active'
            ? slot.bike_slug
            : slot.status === 'maintenance'
                ? 'En mantenimiento'
                : 'No disponible';

    const isRentVisible = slot.status === 'Active';
    const isLeaveVisible = slot.status === 'free';

    // console.log(user.rent.id);


    return (
        <Card className="">
            <div className="flex justify-end px-4 pt-4">
                <Dropdown inline label="">
                    <DropdownItem>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            More info
                        </a>
                    </DropdownItem>
                    <DropdownItem>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Notify Incidence
                        </a>
                    </DropdownItem>
                </Dropdown>
            </div>
            <div className="flex flex-col items-center pb-10">
                <img
                    alt="Bonnie image"
                    height="96"
                    src="https://picsum.photos/96"
                    width="96"
                    className="mb-3 rounded-full shadow-lg"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{text}</h5>
                <div className="mt-4 flex space-x-3 lg:mt-6">
                    {isLeaveVisible && (
                        
                        <LeaveBikeModal 
                            sendData={() => useEndRent({return_slot:slot.id})} 
                            slot={slot} 
                        />

                    )}
                    {isRentVisible && (
                        <RentalModal 
                            sendData={() => useStartRent({collection_slot:slot.id})} 
                            slot={slot} 
                        />
                    )}
                </div>
            </div>

        </Card>
    );
}

export default SlotCard;

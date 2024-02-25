import React from 'react';
import { Card } from 'flowbite-react';
import ListNotifications from '@/components/notifications/ListNotifications';
import { useNotifications } from '../../../hooks/useNotifications';

const NotificationDashboard = () => {

    const { notifications, setNotifications, createNotification, deleteNotification, createResponse } = useNotifications();
    
    return (
        <>
            <div className='container'>
                <Card>
                    <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                        Notifications
                    </h5>
                    <p className='font-normal text-gray-700 dark:text-gray-400'>
                        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                    </p>
                    <ListNotifications notifications={notifications} createNotification={createNotification} deleteNotification={deleteNotification} createResponse={createResponse}/>
                </Card>
            </div>
        </>

    );
};

export default NotificationDashboard;

import React from 'react';
import ListNotifications from '@/components/notifications/ListNotifications';
import { useNotifications } from '../../../hooks/useNotifications';

const NotificationsList = () => {

    const { notifications, setNotifications, createNotification, deleteNotification, createResponse } = useNotifications();

    return (
        <div className='bg-white p-3 shadow-sm rounded-sm'>
            <ListNotifications notifications={notifications} createNotification={createNotification} deleteNotification={deleteNotification} createResponse={createResponse} />
        </div>
    );
};

export default NotificationsList;

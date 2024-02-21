import React, { createContext, useContext, useEffect, useState } from 'react';
import NotificationsService from '../services/NotificationsService';
import UserContext from './UserContext';

const Context = createContext({});

export function NotificationsContext({ children }) {
    const { user } = useContext(UserContext);
    const [notifications, setNotifications] = useState([]);

    useEffect(function () {
        if (user.role) {
            NotificationsService.GetNotifications(user.role === 'Admin' ? 'admin/' : '')
                .then((res) => {
                    setNotifications(res.data);
                })
                .catch((e) => console.error(e));
        }
    }, [setNotifications, user]);

    const contextValue = {
        notifications,
        setNotifications
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
};

export default Context;
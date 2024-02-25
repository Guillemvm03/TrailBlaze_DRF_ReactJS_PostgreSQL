import { useCallback, useContext } from "react"
import { useToastr } from "./useToastr";
import NotificationsContext from "../context/NotificationsContext";
import NotificationsService from "../services/NotificationsService";
import { useAuth } from "./useAuth";

export function useNotifications() {
    const { notifications, setNotifications } = useContext(NotificationsContext);
    const { user, setUser } = useAuth();
    const { useCreateToastr } = useToastr();

    const createNotification = useCallback((notification) => {
        NotificationsService.CreateNotification(notification)
            .then(({ data, status }) => {
                if (status === 200) {
                    setNotifications([...notifications, data]);
                    useCreateToastr({ status: true });
                }
            })
            .catch(e => {
                console.error(e);
            });
    }, [notifications]);

    const createResponse = useCallback((notification) => {
        NotificationsService.CreateResponse(notification)
            .then(({ data, status }) => {
                if (status === 201) {
                    setNotifications(notifications.map(n => n.id === data.id ? data : n));
                    setUser({ ...user, unread_notifications: user.unread_notifications - 1 });
                    useCreateToastr({ status: true });
                }
            })
            .catch(e => {
                console.error(e);
            });
    }, [notifications]);

    const deleteNotification = useCallback((id) => {
        NotificationsService.DeleteNotification(id)
            .then(({ status }) => {
                if (status === 204) {
                    setNotifications(notifications.filter(notification => notification.id !== id));
                    useCreateToastr({ status: true });
                }
            })
            .catch(e => {
                console.error(e);
            });
    }, [notifications]);

    return {
        notifications,
        setNotifications,
        createNotification,
        createResponse,
        deleteNotification
    }
}
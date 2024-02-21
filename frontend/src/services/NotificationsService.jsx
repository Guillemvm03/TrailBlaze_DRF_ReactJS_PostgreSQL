import Api from './Api';

const NotificationsService = {

    GetNotifications(type = '') {
        return Api().get(type + 'notification');
    },

    CreateNotification(notification) {
        return Api().post('notification/', notification);
    },

    CreateResponse(notification) {
        return Api().post('notification/' + notification.id + '/response', notification);
    },

    DeleteNotification(id) {
        return Api().delete('notification/' + id + '/');
    }

}

export default NotificationsService;
import Api from './Api';

const SlotService = {

    GetAllSlots() {
        return Api().get('slot/all');
    },

    GetSlots(slug) {
        return Api().get(`station/${slug}/slot`);
    },

    CreateSlot(station_slug) {
        return Api().post(`station/${station_slug}/slot`, {});
    },

    GetSlot(station_slug, id) {
        return Api().get(`station/${station_slug}/slot/${id}`);
    },

    DeleteSlot(station_slug, id) {
        return Api().delete(`station/${station_slug}/slot/${id}`);
    },

    UpdateSlot(station_slug, data) {
        return Api().put(`station/${station_slug}/slot/${data.id}`, data);
    },


}

export default SlotService;
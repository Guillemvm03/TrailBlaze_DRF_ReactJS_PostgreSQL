import Api from './Api';

const BikesService = {

    GetBikes() {
        return Api().get('bike');
    },

    CreateBikes(data) {
        return Api().post('bike', data);
    },

    DeleteBike(slug) {
        return Api().delete(`bike/${slug}`);
    },

    UpdateBike(slug, data) {
        return Api().put(`bike/${slug}`, data);
    },


}

export default BikesService;
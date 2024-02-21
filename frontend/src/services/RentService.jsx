import Api from './Api';

const RentService = {

    start_rental(data) {
        // const requestData = {
        //     'collection_slot': data 
        // };
        console.log(data);
        return Api().post('start_rent/', data);
    },

    end_rental(data,id) {
        console.log(id);
        return Api().put('end_rent/'+id+"/", data);

    },

    get_user_rental(data) {
        // console.log(data);

        return Api().get('rent/user_rent/', data);
    }

}

export default RentService;
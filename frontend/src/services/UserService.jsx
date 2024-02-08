import Api from './Api';

const UserService = {

    LoginUser(data) {
        return Api().post('users/login', data);
    },

    RegisterUser(data) {
        return Api().post('users', data);
    },

    GetUser() {
        return Api().get('user');
    },


}

export default UserService;
import Api from './Api';

const StripeService = {


    CreatePaymentIntent() {
        return Api().post(`charge`, {});
    },

    Charge(data) {
        return Api().post(`charge`, data);
    }

}

export default StripeService;
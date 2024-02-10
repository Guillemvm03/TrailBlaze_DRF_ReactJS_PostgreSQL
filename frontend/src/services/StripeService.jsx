import Api from './Api';

const StripeService = {


    CreatePaymentIntent(amount) {
        return Api().post(`charge`, { amount });
    },

    Charge(data) {
        return Api().post(`charge`, data);
    }

}

export default StripeService;
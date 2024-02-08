import { useCallback, useState } from "react"
import StripeService from "../services/StripeService";
import { useToastr } from "./useToastr";

export function useStripeHook() {

    const [clientSecret, setClientSecret] = useState('');
    const { useCreateToastr } = useToastr();

    const useCreatePaymentIntent = useCallback(() => {
        StripeService.CreatePaymentIntent()
            .then(({ data, status }) => {
                if (status === 200) {
                    setClientSecret(data.cs);
                }
            })
            .catch(e => {
                console.error(e);
            });
    }, [clientSecret])

    const useCreateCharge = useCallback((res) => {
        StripeService.Charge({ id: res })
            .then(({ data, status }) => {
                if (status === 200) {
                    useCreateToastr({ status: true })
                }
            })
            .catch(e => {
                useCreateToastr({ status: true, error: 'wrong', message: e.response.data.error})
                console.error(e);
            });
    }, [])

    return {
        clientSecret,
        useCreatePaymentIntent,
        useCreateCharge
    }
}
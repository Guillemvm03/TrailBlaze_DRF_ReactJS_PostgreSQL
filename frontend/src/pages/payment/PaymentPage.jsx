import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useStripeHook } from "../../hooks/useStripe";

import "./PaymentPage.scss";
import CheckoutForm from "../../components/payment/CheckoutForm";

const stripePromise = loadStripe("pk_test_51Of5QFCCu0LSaV3zlAtFwlGXjDRKouCORS6UWlx2DYGf2u8ZlkPDNegPnxCDuapNFHWwoSsm6k5Kkm0dnLJ00JCE00aeJ0oed2");

export default function PaymentPage() {
  const { clientSecret, useCreatePaymentIntent, useCreateCharge } = useStripeHook();

  useEffect(() => {
    useCreatePaymentIntent();
  }, [])

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  const chargeFunction = (res) => {
    useCreateCharge(res);
  }

  return (
    <div className="PaymentPage">
      <div className="cont p-6 bg-white rounded-s-lg">
        <a>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Recarga tu saldo ahora</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">10 €</p>
      </div>

      {clientSecret && (
        <Elements options={options} stripe={stripePromise} >
          <CheckoutForm sendData={(res) => chargeFunction(res)} />
        </Elements>
      )}
    </div>
  );
}
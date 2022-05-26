import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';




const CheckoutForm = ({ item, orderId }) => {


    console.log(orderId)






    const price = item?.totalPrice;



    const stripe = useStripe();
    const elements = useElements();

    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const navigate = useNavigate()


    useEffect(() => {
        const url = `http://localhost:5000/create-payment-intent`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

                authentication: `Bearer ${localStorage.getItem('accessToken')}`

            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data?.clientSecret) {

                    setClientSecret(data?.clientSecret)

                }
            })
    }, [price])

    console.log(clientSecret)


    const handleSubmit = async (event) => {
        event.preventDefault()


        if (!stripe || !elements) {

            return;

        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }


        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })


        setCardError(error?.message || '')

        const { paymentIntent, error: intentError } = await stripe
            .confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: item?.userName,
                        email: item?.userEmail
                    },
                },
            })

        if (intentError) {
            setCardError(intentError.message)
            setSuccess('')

        }

        else {
            setCardError('')
            console.log(paymentIntent)
            setTransactionId(paymentIntent.id)
            setSuccess('Payment successful')
            toast.success('Payment successful')
            navigate('/dashboard/myoders')



            // srote data in database 

            // const payment = {
            //     transactionId: paymentIntent.id

            // }

            // console.log('item id', item?._id)

            const billId = { transactionId: paymentIntent.id }

            console.log(billId)

            fetch(`http://localhost:5000/placeorder/${orderId}`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`

                },
                body: JSON.stringify(billId)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })


        }


    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />


                <button className='btn btn-success btn-sm mt-3' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>

            {
                cardError && <p className='text-red-500'>{cardError}</p>
            }
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p className='text-green-500'>{transactionId}</p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;
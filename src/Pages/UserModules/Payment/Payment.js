import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import auth from '../../../firebase.init';
import CheckoutForm from './CheckOutForm';

const Payment = () => {


    const [item, setItem] = useState({})

    const { id } = useParams()

    useEffect(() => {

        const url = `http://localhost:5000/order/${id}`;

        fetch(url, {
            headers: {
                authentication: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setItem(data)

            })

    }, [id])


    console.log(item)

    const stripePromise = loadStripe('pk_test_51L1w1yF00OEb7B1tXOfmb6YasMxhiYdSzkn5KASD7a78M5y4XfSrwS0z2ZpJNgWFZYNWXcLO22RNXzAaPWWLeaqf00O1h6t7OZ');


    return (



        <div className='flex justify-center items-center'>
            <div class="card w- bg-base-100 shadow-xl">
                <figure class="px-10 pt-10">
                    <img className='w-48' src={item?.image} alt={item?.name} class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">{item?.name}</h2>

                    <p>Order Quantity : {item?.orderQuantity}</p>
                    <p>Total price : {item?.totalPrice}</p>

                </div>


                <div className='p-20'>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm item={item} />
                    </Elements>
                </div>
            </div>





        </div>
    );
};

export default Payment;
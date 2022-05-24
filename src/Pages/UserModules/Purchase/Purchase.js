import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { set } from 'react-hook-form';
import axios from 'axios';
const Purchase = () => {

    const { id } = useParams()

    const [item, setItem] = useState({});

    let [minOrder, setMinOrder] = useState(0);
    let [total, setTotal] = useState(1);

    const [user, loading, error] = useAuthState(auth);



    useEffect(() => {

        const url = `http://localhost:5000/item/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setItem(data)
                setMinOrder(data?.minQrderQuantity)

                setTotal(data?.minQrderQuantity * data?.unitPrice)


            })
    }, [id])







    const handleIncrease = () => {


        if (!minOrder) {
            setTotal(item?.unitPrice)
            return setMinOrder(1)
        }

        minOrder = minOrder + 1;
        // if (!minOrder) {
        //     return toast('Plase Enter an valid number')
        // }
        setMinOrder(minOrder)
        setTotal(minOrder * item?.unitPrice)


    }

    const handleDecrease = () => {

        if (minOrder > 0) {

            minOrder = minOrder - 1;

            // if (!minOrder) {
            //     return toast('Plase Enter an valid number')
            // }
            setMinOrder(minOrder)
            setTotal(minOrder * item?.unitPrice)

        }


    }


    const handleChange = (event) => {

        const minNumberQuanity = parseInt(event?.target?.value);

        if (!minNumberQuanity) {
            setMinOrder()
            setTotal(0)


        }




        setMinOrder(minNumberQuanity)
        setTotal(minNumberQuanity * item?.unitPrice)


        console.log(minNumberQuanity)

    }





    const handleSubmit = (event) => {

        event.preventDefault()


        const order = {
            orderQuantity: minOrder,
            userName: user?.displayName,
            userEmail: user?.email,
            totalPrice: total,
            unitPrice: item?.unitPrice,
            address: event?.target?.address?.value,
            phoneNumber: event?.target?.phonenumber?.value,
            itemId: item?._id,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            status: 'pending'

        }

        console.log(order)

        const url = `http://localhost:5000/order`;

        axios.post(url, order)
            .then(function (response) {
                console.log(response);

                if (response.data.insertedId) {
                    toast('Your Order Success Fully Placed')
                    event.target.reset()
                }
            })
            .catch(function (error) {
                console.log(error);

            });




    }

    console.log(item)

    return (







        <div class="card w-full bg-base-100 shadow-xl">
            <figure><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>


            <div class="card-body text-center">
                <h2 class="text-2xl">
                    {item?.name}
                    <div class="badge badge-secondary h-12">price {item?.unitPrice}</div>
                </h2>
                <p>{item?.description}</p>

                <p>Min. Order Quantity : {item?.minQrderQuantity}</p>
                <p>Availble Quantity : {item?.quantity}</p>
                <div >


                    <div>


                        <input onChange={handleChange} type="number" value={minOrder} placeholder="Type here"

                            class="input input-bordered input-secondary w-full max-w-xs" />

                    </div>

                    <div className="card-actions justify-center mt-3">

                        <button className='badge badge-outline' onClick={handleIncrease} >Increase</button>


                        <button className='badge badge-outline' onClick={handleDecrease} >Decrease</button>


                    </div>

                    <div className='flex justify-center items-center h-screen'>

                        <div className='card w-96 bg-gray-200 shadow-xl'>

                            <div className='card-body'>
                                <form onSubmit={handleSubmit} >


                                    <h1 className='text-2xl font-bold'>User Info</h1>



                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">User Name</span>
                                        </label>

                                        <input type="text"
                                            placeholder="Your Name"
                                            name='username'
                                            defaultValue={user?.displayName}
                                            disabled
                                            required
                                            className="input input-bordered input-success  w-full max-w-xs" />

                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>

                                        <input type="text"
                                            placeholder="User Email"
                                            name='useremail'
                                            defaultValue={user?.email}
                                            disabled
                                            required

                                            className="input input-bordered input-success  w-full max-w-xs" />

                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Address</span>
                                        </label>

                                        <textarea type="text"
                                            placeholder="Address"
                                            name='address'
                                            className="input input-bordered input-success  w-full max-w-xs" />

                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Phone Number</span>
                                        </label>

                                        <textarea type="text"
                                            placeholder="Phone Number"
                                            name='phonenumber'
                                            className="input input-bordered input-success  w-full max-w-xs" />

                                    </div>

                                    <h1>Total Price : {total ? total : 0}</h1>



                                    <input type="submit" disabled={minOrder < item?.minQrderQuantity || minOrder > item?.quantity || !minOrder} className='btn mt-2 w-full max-w-xs' value='Order Confirm' />


                                </form>
                            </div>
                        </div>


                    </div>


                </div>
            </div>




        </div>




    );
};

export default Purchase;
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { set } from 'react-hook-form';
import axios from 'axios';
import { signOut } from 'firebase/auth';
const Purchase = () => {

    const { id } = useParams()

    const [item, setItem] = useState({});

    let [minOrder, setMinOrder] = useState(0);
    let [total, setTotal] = useState(0);

    const [user, loading, error] = useAuthState(auth);



    useEffect(() => {

        const url = `https://vast-springs-92836.herokuapp.com/item/${id}`
        fetch(url, {
            headers: {
                authentication: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                console.log(res)
                if (res.status === 401 || res.status === 403) {
                    signOut(auth)
                    localStorage.removeItem('accessToken')
                }
                return res.json()
            })
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





    const handleSubmit = async (event) => {

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
            status: 'pending',
            image: item?.image,
            name: item?.name


        }

        console.log(order)

        const url = `https://vast-springs-92836.herokuapp.com/order`;

        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                authentication: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(order)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data?.insertedId) {
                    toast('Your Order Success Fully Placed')
                    event.target.reset()
                }


            })













    }

    console.log(item)

    return (







        <div className="card w-full bg-base-100 shadow-xl">
            <figure><img src={item?.image} alt="Shoes" /></figure>


            <div className="card-body text-center">
                <h2 className="text-2xl">
                    {item?.name}
                    <div className="badge badge-secondary h-12">price {item?.unitPrice}</div>
                </h2>
                <p>{item?.description}</p>

                <p>Min. Order Quantity : {item?.minQrderQuantity}</p>
                <p>Availble Quantity : {item?.quantity}</p>
                <div >


                    <div>


                        <input onChange={handleChange} type="number" value={minOrder} placeholder="Type here"

                            className="input input-bordered input-secondary w-full max-w-xs" />

                    </div>

                    <div className="card-actions justify-center mt-3">

                        <button className='badge badge-outline' onClick={handleIncrease} >Increase</button>


                        <button className='badge badge-outline' onClick={handleDecrease} >Decrease</button>


                    </div>

                    <div>
                        {
                            minOrder < item?.minQrderQuantity && <p className='text-error text-xl font-bold'>Input Value can't be less than Min. Order Quantity </p>
                        }
                        {
                            !minOrder && <p className='text-error text-xl font-bold'>Please type your order quantity</p>
                        }
                        {
                            minOrder > item?.quantity && <p className='text-error text-xl font-bold'>Input Value can't be grater than Availble Quantity</p>
                        }



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
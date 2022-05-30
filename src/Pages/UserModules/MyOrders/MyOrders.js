import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const [user, loading, error] = useAuthState(auth);
    const url = `https://toolsapi.priyopathshala.com/orders/${user?.email}`;
    const [item, setItem] = useState(null);
    const navigate = useNavigate()

    const { data, refetch } = useQuery('myOrders',
        () => fetch(url, {
            headers: {
                authentication: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json()))


    console.log(data)



    const handleDelete = (id) => {



        const url = `https://toolsapi.priyopathshala.com/order/delete/${id}`;

        fetch(url, {
            method: "POST",
            headers: {
                authentication: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    setItem(null)
                    toast.success("Delete Successful")
                    refetch()
                }


            })


    }

    return (
        <div className="overflow-x-auto w-full mt-20">
            <table className="table w-full">

                <thead>
                    <tr>

                        <th>Name</th>

                        <th>Order Quantity</th>
                        <th>Total Price</th>
                        <th>Transaction Id</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>


                    {
                        data?.map(item => <tr key={item?._id}>

                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-full h-12">
                                            <img src={item?.image} alt={item?.name} />
                                        </div>
                                    </div>
                                    <div>
                                        <p>{item?.name}</p>

                                    </div>
                                </div>
                            </td>
                            <td>
                                {item?.orderQuantity}

                            </td>
                            <td>{item?.totalPrice}</td>
                            <td>{item?.transactionId}</td>
                            <td>


                                {
                                    !item?.transactionId && <button
                                        onClick={() => navigate(`/dashboard/payment/${item?._id}`)} className="btn btn-success btn-xs">Pay</button>
                                }


                                {
                                    item?.transactionId &&
                                    <button
                                        className="btn btn-success btn-xs">{item?.status === "paid" ? 'Paid' : 'Shiped'}</button>
                                }









                            </td>
                            <td>

                                {
                                    !item?.transactionId && <label onClick={() => {
                                        setItem(item)

                                    }} for="delete-modal" className="btn btn-error btn-xs ">Delete</label>
                                }



                            </td>

                        </tr>)
                    }



                </tbody>


            </table>


            {/* Modal */}

            {
                item && <>
                    <input type="checkbox" id="delete-modal" className="modal-toggle" />
                    <div className="modal bg-transparent">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Are you sure to detele  {item?.name} </h3>

                            <div className="modal-action">
                                <button onClick={() => handleDelete(item?._id)} className='btn btn-error'> Delete</button>
                                <label for="delete-modal" className="btn">Close</label>
                            </div>
                        </div>
                    </div></>
            }



        </div>
    );
};

export default MyOrders;
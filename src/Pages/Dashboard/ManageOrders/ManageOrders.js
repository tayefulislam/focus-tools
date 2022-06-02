import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';

const ManageOrders = () => {


    const [modal, setModal] = useState(null);


    const url = `https://vast-springs-92836.herokuapp.com/orders`
    const { data, refetch } = useQuery('manageOrders', () => fetch(url, {
        headers: {
            authentication: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    console.log(data)


    const handleUpdate = async (id) => {


        const url = `https://vast-springs-92836.herokuapp.com/order/update/${id}`;
        fetch(url, {
            method: 'POST',
            headers: {
                authentication: `Bearer ${localStorage.getItem('accessToken')}`

            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    toast("Item Shipped")
                    refetch()
                }
            })





    }


    const handleDelete = (id) => {




        const url = `https://vast-springs-92836.herokuapp.com/order/delete/${id}`;


        fetch(url, {
            method: 'POST',
            headers: {
                authentication: `Bearer ${localStorage.getItem('accessToken')}`

            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data) {
                    toast("Item Deleted")
                    refetch()
                    setModal(null)
                }
            })



    }


    return (
        <div className="overflow-x-auto">
            <table className="table table-compact w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Itemn Name</th>
                        <th>Order By</th>
                        <th>Order Quantity</th>
                        <th>Transaction Id</th>
                        <th>Status</th>

                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>


                    {
                        data?.map((order, index) => <tr key={index}>

                            <th>{index + 1}</th>
                            <td>{order?.name}</td>
                            <td className='font-bold'>{order?.userEmail}</td>
                            <td>{order?.orderQuantity}</td>

                            <td>{order?.transactionId ? order?.transactionId : 'UnPaid'}</td>

                            <td>
                                {!order?.transactionId && 'Unpaid'}
                                {order?.status === 'paid' && 'Padding'}
                                {order?.status === 'shipped' && 'Shipped'}
                            </td>



                            <td>

                                {
                                    order?.transactionId ? <button
                                        onClick={() => handleUpdate(order?._id)} disabled={order?.status === 'shipped'} className="btn btn-xs btn-success">Shipped</button> : <label for="manage-order-delete"
                                            onClick={() => { setModal(order) }} className="btn btn-xs btn-error" >Cancel</label>
                                }


                            </td>



                        </tr>)
                    }

                </tbody>
                <tfoot>
                    <tr>
                        <th>#</th>
                        <th>Itemn Name</th>
                        <th>Order By</th>
                        <th>Order Quantity</th>
                        <th>Transaction Id</th>
                        <th>Status</th>

                        <th>Action</th>
                    </tr>
                </tfoot>
            </table>


            {modal && <>


                <input type="checkbox" id="manage-order-delete" className="modal-toggle" />
                <div className="modal bg-transparent">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg"> Are you sure to detele {modal?.name} ?</h3>

                        <div className="modal-action">

                            <button className='btn btn-error' onClick={() => handleDelete(modal?._id)}>Delete</button>

                            <label for="manage-order-delete" className="btn">Cancel</label>
                        </div>
                    </div>
                </div></>}




        </div>
    );
};

export default ManageOrders;
import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

const ManageProducts = () => {

    const url = `https://vast-springs-92836.herokuapp.com/items`;
    const { data, refetch } = useQuery('ManageProducts', () => fetch(url, {
        headers: {
            authentication: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))


    const [deleteModal, setDeleteModal] = useState(null)

    console.log(data)


    const handelDelete = (id) => {

        console.log(id)
        const url = `https://vast-springs-92836.herokuapp.com/delete/item/${id}`;

        fetch(url, {
            method: 'POST',
            headers: {
                authentication: `Bearer ${localStorage.getItem('accessToken')}`

            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {

                    toast.success('Item delete Successfuly')
                    setDeleteModal(null)

                    refetch()
                }
            })


    }

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">

                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item Name</th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>


                    {
                        data?.map((item, index) => <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{item?.name}</td>
                            <td>



                                <label
                                    onClick={() => setDeleteModal(item)}
                                    for="item-delete-modal" className="btn modal-button btn-error btn-xs">Delete</label>

                            </td>

                        </tr>)
                    }



                </tbody>
            </table>




            {
                deleteModal && <>

                    <input type="checkbox" id="item-delete-modal" className="modal-toggle" />
                    <div className="modal bg-transparent modal-middle">
                        <div className="modal-box ">
                            <h3 className="font-bold text-lg ">Are you want to delete {deleteModal?.name} ?</h3>

                            <div className="modal-action">
                                <button
                                    onClick={() => handelDelete(deleteModal?._id)}
                                    className='btn  text-white'>YES,Delete !</button>

                                <label for="item-delete-modal" className="btn">Cancel</label>
                            </div>
                        </div>
                    </div>


                </>
            }






        </div>
    );
};

export default ManageProducts;
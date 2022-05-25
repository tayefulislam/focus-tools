import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

const ManageUser = () => {

    const url = `http://localhost:5000/users`

    const { data, refetch } = useQuery('manageUser', () => fetch(url, {
        headers: {
            authentication: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()))


    const handleAdmin = (email) => {
        console.log(email)
        const url = `http://localhost:5000/makeAdmin/${email}`;


        fetch(url, {
            method: "POST",
            headers: {
                authentication: `Bearer ${localStorage.getItem('accessToken')}`
            },


        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data?.modifiedCount > 0) {

                    toast.success('Admin Successfuly')
                    refetch()
                }


            })




    }
    const handleUser = (email) => {
        console.log(email)
        const url = `http://localhost:5000/makeUser/${email}`;
        fetch(url, {
            method: "POST",
            headers: {
                authentication: `Bearer ${localStorage.getItem('accessToken')}`
            },


        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data?.modifiedCount) {

                    toast.success('User Make Successfuly')
                    refetch()
                }


            })




    }

    console.log(data)
    return (
        <div class="overflow-x-auto">
            <table class="table w-full">

                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email</th>

                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>


                    {

                        data?.map((user, index) => <tr class="hover">
                            <th>{index + 1}</th>
                            <td>{user?.userEmail}</td>

                            <td>

                                {
                                    user?.role === 'admin' ?
                                        <button onClick={() => handleUser(user?.userEmail)} className='btn'>Make User</button>
                                        :
                                        <button onClick={() => handleAdmin(user?.userEmail)} className='btn'>Make Admin</button>


                                }


                            </td>



                        </tr>)
                    }



                </tbody>
            </table>
        </div>
    );
};

export default ManageUser;
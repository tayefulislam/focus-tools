import React from 'react';
import { useQuery } from 'react-query';

const ManageUser = () => {

    const url = `http://localhost:5000/users`

    const { data } = useQuery('manageUser', () => fetch(url)
        .then(res => res.json()))

    console.log(data)
    return (
        <div class="overflow-x-auto">
            <table class="table w-full">

                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>


                    {

                        data?.map((user, index) => <tr class="hover">
                            <th>{index + 1}</th>
                            <td>{user?.userEmail}</td>
                            <td><button className='btn'>Make Admin</button></td>
                            <td><button>Make Admin</button></td>
                        </tr>)
                    }



                </tbody>
            </table>
        </div>
    );
};

export default ManageUser;
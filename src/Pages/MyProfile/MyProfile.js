import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const MyProfile = () => {


    const [user, loading, error] = useAuthState(auth);
    const url = `https://vast-springs-92836.herokuapp.com/myprofile/${user?.email}`
    const { data, refetch } = useQuery('myProfile', () => fetch(url, {
        headers: {
            authentication: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => res.json()))

    console.log(data)

    const handeSubmit = (event) => {


        event.preventDefault()

        const userInfo = {

            userName: event.target.name.value,
            location: event.target.location.value,
            linkendIn: event.target.linkendin.value,
            education: event.target.education.value,

        }

        console.log(userInfo)

        const url = `https://vast-springs-92836.herokuapp.com/update/myprofile/${user?.email}`


        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                authentication: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(userInfo)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.acknowledged) {
                    toast.success('Profile Updated')
                    refetch()
                }


            })


    }


    return (
        <div>

            <div className='flex justify-center items-center h-screen'>

                <div className='card w-96 bg-green-300 shadow-xl'>

                    <div className='card-body'>
                        <form onSubmit={handeSubmit} >



                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>

                                <input type="text"
                                    placeholder="Your Name"
                                    name='name'
                                    required
                                    defaultValue={data?.userName ? data?.userName : user?.displayName}
                                    className="input input-bordered input-success  w-full max-w-xs" />

                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>

                                <input type="text"
                                    placeholder="Image"
                                    name='email'
                                    disabled
                                    defaultValue={user?.email}

                                    className="input input-bordered input-success  w-full max-w-xs" />

                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Location</span>
                                </label>

                                <textarea type="text"
                                    placeholder="Location"
                                    name='location'
                                    defaultValue={data?.location}
                                    className="input input-bordered input-success  w-full max-w-xs" />

                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">LinkendIn Profile</span>
                                </label>

                                <input type="text"
                                    placeholder="LinkendIn"
                                    name='linkendin'
                                    defaultValue={data?.linkendIn}

                                    className="input input-bordered input-success  w-full max-w-xs" />

                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Education</span>
                                </label>

                                <input type="text"
                                    placeholder="Education"
                                    name='education'
                                    defaultValue={data?.education}

                                    className="input input-bordered input-success  w-full max-w-xs" />

                            </div>


                            <input type="submit" className='btn mt-2 w-full max-w-xs' value='Update Profile' />


                        </form>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default MyProfile;
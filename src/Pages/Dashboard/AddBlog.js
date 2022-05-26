import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const AddBlog = () => {

    const [user, loading, error] = useAuthState(auth);


    const handleSubmit = (event) => {

        event.preventDefault()

        const newBlog = {
            title: event.target.title.value,
            body: event.target.body.value,
            writeBy: user?.displayName,
            email: user?.email


        }

        const url = `https://vast-springs-92836.herokuapp.com/newBlog`



        axios.post(url, newBlog)
            .then(function (response) {
                console.log(response);
                if (response.data.insertedId) {
                    toast.success('Your Blog Publish Successfuly')
                    event.target.reset()
                }


            })
            .catch(function (error) {
                console.log(error);
            });


        console.log(newBlog)



    }




    return (
        <div className='flex justify-center items-center my-12'>
            <div className="card w-96  shadow-xl">
                <div className="card-body ">
                    <h2 className="text-center text-2xl font-bold">Write A New Blog</h2>


                    <form onSubmit={handleSubmit}>


                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Title</span>

                            </label>

                            <textarea type="text"
                                placeholder="Title"
                                name='title'
                                className="input input-bordered w-full max-w-xs"



                            />



                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Body</span>

                            </label>

                            <textarea type="text"
                                placeholder="Body"
                                name='body'
                                className="input input-bordered w-full max-w-xs"
                            />


                        </div>





                        <input className='btn  w-full max-w-xs mt-2' type="submit" value="Publish" />
                    </form>












                </div>
            </div>
        </div>
    );
};

export default AddBlog;
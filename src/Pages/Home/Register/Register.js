import React from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';

const Register = () => {


    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const { email, password, name } = data;
        const displayName = name;

        await createUserWithEmailAndPassword(email, password)
        await updateProfile({ displayName })
        console.log(data)

    };

    console.log(user)

    console.log(error)

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="card w-96 bg-gray-200 shadow-xl">
                <div className="card-body ">
                    <h2 className="text-center text-2xl font-bold">Sign Up</h2>


                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>

                            </label>

                            <input type="text"
                                placeholder="Your Name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("name", {

                                    required: {
                                        value: true,
                                        message: 'Name is Required'
                                    },


                                })}


                            />


                            <label className="label">
                                {errors.name?.type === 'required' && <span className="label-text-alt  text-red-500 text-sm">{errors.name.message}</span>}



                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>

                            </label>

                            <input type="text"
                                placeholder="Email Address"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", {

                                    required: {
                                        value: true,
                                        message: 'Please Enter A Email Address'
                                    },

                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Plase Provied a Valid Email Adderess',
                                    }
                                })}


                            />


                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt  text-red-500 text-sm">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt  text-red-500 text-sm">{errors.email.message}</span>}


                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>

                            </label>

                            <input type="password"
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs"
                                {...register("password", {

                                    required: {
                                        value: true,
                                        message: 'Please Enter A Password'
                                    },

                                    minLength: {
                                        value: 6,
                                        message: 'Plase Provied A password whice content more than 6 letter'
                                    }
                                })}


                            />


                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500 text-sm">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500 text-sm">{errors.password.message}</span>}


                            </label>
                        </div>


                        {/* {allErrors} */}

                        <input className='btn  w-full max-w-xs' type="submit" value="Login" />
                    </form>

                    <p className='text-lg'><small>Already Have Account? <Link className='text-secondary' to='/login'>Login</Link ></small></p>



                    <div className="divider">OR</div>




                    <button className="btn btn-outline">CONTINUE WITH GOOGLE</button>
                    <button className="btn btn-outline">CONTINUE WITH GITHUB</button>

                    {/* <button onClick={() => signInWithGoogle()} className="btn btn-outline">CONTINUE WITH GOOGLE</button> */}




                </div>
            </div>
        </div>
    );
};

export default Register;
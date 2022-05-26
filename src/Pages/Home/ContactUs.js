import React from 'react';

const ContactUs = () => {
    return (

        <div className='flex justify-center items-center my-12'>
            <div className="card w-96  shadow-xl">
                <div className="card-body ">
                    <h2 className="text-center text-2xl font-bold">Contact Us</h2>


                    <form>


                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>

                            </label>

                            <input type="text"
                                placeholder="Email Address"
                                name='email'
                                className="input input-bordered w-full max-w-xs"



                            />



                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Message</span>

                            </label>

                            <textarea type="text"
                                placeholder="You Message"
                                name='message'
                                className="input input-bordered w-full max-w-xs"
                            />


                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Contact Number</span>

                            </label>

                            <input type="text"
                                placeholder="Your Contact Number"
                                name='number'
                                className="input input-bordered w-full max-w-xs"
                            />


                        </div>




                        <input className='btn  w-full max-w-xs mt-2' type="submit" value="Send" />
                    </form>












                </div>
            </div>
        </div>
    );
};

export default ContactUs;
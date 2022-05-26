import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';

const AddProduct = () => {

    const [user, loading, error] = useAuthState(auth);



    const handeSubmit = (event) => {
        event.preventDefault()

        const trackId = Math.floor(Math.random() * 100000);


        const minOrderQuantity = parseInt(event.target.minorderquantity.value);

        const quantity = parseInt(event.target.quantity.value);



        if (minOrderQuantity > quantity) {

            toast.error("Min Order Quantity can't be grather than Available")
            return


        }
        if (!minOrderQuantity || !quantity) {

            toast.error("Plase Enter a valid number")
            return


        }


        const product = {
            name: event.target.name.value,
            image: event.target.image.value,
            description: event.target.description.value,

            minQrderQuantity: minOrderQuantity,
            quantity: quantity,
            unitPrice: parseInt(event.target.unitprice.value),

            trackId: trackId,
            insertByEmail: user?.email,
            insertByName: user?.displayName,

        }

        console.log(product)
        const url = `https://vast-springs-92836.herokuapp.com/additem`;

        fetch(url, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                authentication: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {

                console.log(data)

                if (data?.insertedId) {
                    toast.success("Product Added")
                    event.target.reset()
                }


            })


    }

    return (
        <div className='flex justify-center items-center h-screen'>

            <div className='card w-96 bg-gray-200 shadow-xl'>

                <div className='card-body'>
                    <form onSubmit={handeSubmit} >



                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>

                            <input type="text"
                                placeholder="Your Name"
                                name='name'
                                required
                                className="input input-bordered input-success  w-full max-w-xs" />

                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Image</span>
                            </label>

                            <input type="text"
                                placeholder="Image"
                                name='image'
                                required

                                className="input input-bordered input-success  w-full max-w-xs" />

                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>

                            <textarea type="text"
                                placeholder="Description"
                                name='description'
                                className="input input-bordered input-success  w-full max-w-xs" />

                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Min. Order Quantity</span>
                            </label>

                            <input type="number"
                                placeholder="Min. Order Quantity"
                                name='minorderquantity'
                                required
                                className="input input-bordered input-success  w-full max-w-xs" />

                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Available Quantity</span>
                            </label>

                            <input type="number"
                                placeholder="Available Quantity"
                                name='quantity'
                                required
                                className="input input-bordered input-success  w-full max-w-xs" />

                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Unit Price</span>
                            </label>

                            <input type="number"
                                placeholder="Price"
                                name='unitprice'
                                required

                                className="input input-bordered input-success  w-full max-w-xs" />

                        </div>

                        <input type="submit" className='btn mt-2 w-full max-w-xs' value='Add Product' />


                    </form>
                </div>
            </div>


        </div>
    );
};

export default AddProduct;
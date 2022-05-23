import React from 'react';
import { toast } from 'react-toastify';

const AddProduct = () => {





    const handeSubmit = (event) => {
        event.preventDefault()

        const trackId = Math.floor(Math.random() * 100000)

        const minOrderQuantity = parseInt(event.target.minorderquantity.value);
        const quantity = parseInt(event.target.quantity.value);


        if (minOrderQuantity > quantity) {

            toast.error("Min Order Quantity can't be grather than Available")
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
        }

        console.log(product)


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
                                className="input input-bordered input-success  w-full max-w-xs" />

                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Image</span>
                            </label>

                            <input type="text"
                                placeholder="Image"
                                name='image'
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
                                className="input input-bordered input-success  w-full max-w-xs" />

                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Available Quantity</span>
                            </label>

                            <input type="number"
                                placeholder="Available Quantity"
                                name='quantity'
                                className="input input-bordered input-success  w-full max-w-xs" />

                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Unit Price</span>
                            </label>

                            <input type="number"
                                placeholder="Price"
                                name='unitprice'
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
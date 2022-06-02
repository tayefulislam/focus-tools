import React from 'react';
import { useNavigate } from 'react-router-dom';

const Product = ({ item }) => {

    const navigate = useNavigate()


    return (
        <div className="card w-full bg-base-100 hover:bg-green-100 hover:shadow-xl ">
            <figure className="px-10 pt-10">
                <img src={item?.image} alt={item?.name} className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">

                <span class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block mb-2">
                    <span class="relative text-white text-2xl">{item?.name}</span>
                </span>
                <p>{item?.description.slice(0, 200) ? `${item?.description.slice(0, 200)}...` : item?.description.slice(0, 200)}</p>

                <p>Min. Order Quantity : {item?.minQrderQuantity}</p>
                <p>Availble Quantity : {item?.quantity}</p>
                <p>Unit Price: {item?.unitPrice}</p>
                <p>Track ID: {item?.trackId}</p>

                <div className="card-actions">
                    <button onClick={() => navigate(`/item/${item?._id}`)} className="btn btn-primary hover:btn-success">Purchase</button>
                </div>
            </div>
        </div>
    );
};

export default Product;
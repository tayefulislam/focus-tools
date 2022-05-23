import React from 'react';
import { useNavigate } from 'react-router-dom';

const Product = ({ item }) => {

    const navigate = useNavigate()


    return (
        <div class="card w-full bg-base-100 shadow-xl">
            <figure class="px-10 pt-10">
                <img src={item?.image} alt={item?.name} class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">{item?.name}</h2>
                <p>{item?.description.slice(0, 200) ? `${item?.description.slice(0, 200)}...` : item?.description.slice(0, 200)}</p>

                <p>Min. Order Quantity : {item?.minQrderQuantity}</p>
                <p>Availble Quantity : {item?.quantity}</p>
                <p>Unit Price: {item?.unitPrice}</p>

                <div class="card-actions">
                    <button onClick={() => navigate(`/item/${item?._id}`)} class="btn btn-primary">Purchase</button>
                </div>
            </div>
        </div>
    );
};

export default Product;
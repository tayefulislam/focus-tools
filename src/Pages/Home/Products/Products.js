import React from 'react';
import { useQuery } from 'react-query';
import Product from '../Product/Product';

const Products = () => {

    const url = `http://localhost:5000/items`;

    const { data } = useQuery('homeItems', () => fetch(url).then(res => res.json()))

    console.log(data)

    return (
        <div>

            <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-3 mx-4 lg:mx-12 '>
                {
                    data?.map(item => <Product
                        key={item?._id}
                        item={item}></Product>)
                }
            </div>

        </div>
    );
};

export default Products;
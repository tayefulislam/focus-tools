import React from 'react';
import { useQuery } from 'react-query';
import Product from '../Product/Product';

const Products = () => {

    const url = `https://vast-springs-92836.herokuapp.com/items`;

    const { data } = useQuery('homeItems', () => fetch(url).then(res => res.json()))

    console.log(data)

    return (
        <div>

            <h1 className='text-center text-xl lg:text-5xl font-bold my-10 '>Our Product Line</h1>

            <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-3 mx-4 lg:mx-12 '>
                {
                    data?.slice(0, 6).map(item => <Product
                        key={item?._id}
                        item={item}></Product>)
                }
            </div>

        </div>
    );
};

export default Products;
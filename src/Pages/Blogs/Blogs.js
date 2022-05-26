import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading/Loading';

const Blogs = () => {

    const url = `http://localhost:5000/blogs`;

    const { isLoading, data } = useQuery('blogs', () =>
        fetch(url).then(res =>
            res.json()
        )
    )

    if (isLoading) {
        return <Loading></Loading>

    }

    console.log(data)

    return (
        <div>

            {
                data?.map((blog, index) =>
                    <div key={index} class="hero  ">
                        <div class="hero-content text-center">
                            <div class="w-full">
                                <h1 class="text-3xl font-bold mb-4">{blog?.title}</h1>
                                <p className='text-xl' > {blog?.body}</p>

                            </div>
                        </div>
                    </div>)
            }


        </div>
    );
};

export default Blogs;
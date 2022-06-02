import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading/Loading';

const Blogs = () => {

    const url = `https://vast-springs-92836.herokuapp.com/blogs`;

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
                    <div key={index} className="hero  ">
                        <div className="hero-content text-center">
                            <div className="w-full">
                                <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>
                                <p className='text-xl' > {blog?.body}</p>

                            </div>
                        </div>
                    </div>)
            }


        </div>
    );
};

export default Blogs;
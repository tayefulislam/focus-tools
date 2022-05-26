import React from 'react';
import { useQuery } from 'react-query';

const Reviews = () => {



    const url = `http://localhost:5000/reviews`;

    const { data } = useQuery('reviews', () => fetch(url).then(res => res.json()))



    return (
        <div>


            <h1 className='text-center text-4xl my-3 font-semibold'>Customer Reviews</h1>



            <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-3 mx-4 lg:mx-12 '>
                {
                    data?.slice(0, 6).map((review, index) => <div class="card w-full bg-neutral text-neutral-content">
                        <div class="card-body items-center text-center">
                            <h2 class="card-title">{review?.userName}</h2>
                            <q><i>{review?.myReview}</i></q>

                            <p>
                                {review?.rating} <input type="radio" name="rating-1" class="mask mask-star" checked />
                            </p>






                        </div>
                    </div>)
                }
            </div>






        </div>
    );
};

export default Reviews;
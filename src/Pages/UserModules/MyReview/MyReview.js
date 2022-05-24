import React, { useState } from 'react';

const MyReview = () => {

    const [rating, setRating] = useState(1);



    const handleSumit = (event) => {
        event.preventDefault()

        const review = {
            rating: rating,
            myReview: event.target.review.value
        }
        console.log(review)

    }


    console.log(rating)
    return (
        <>
            <h1 className='text-center text-2xl font-bold'>My Review</h1>

            <h1 className='text-center text-xl font-semibold'>Positive reviews from awesome customers like you, help us to improve service.</h1>


            <div className='flex justify-center items-center'>





                <form onSubmit={handleSumit} >





                    <div class="rating  flex justify-center items-center ">
                        <input type="radio" name="rating-1" class="mask mask-star" onClick={() => setRating(1)} defaultChecked={rating === 1} />
                        <input type="radio" name="rating-1" class="mask mask-star" onClick={() => setRating(2)} defaultChecked={rating === 2} />
                        <input type="radio" name="rating-1" class="mask mask-star" onClick={() => setRating(3)} defaultChecked={rating === 3} />
                        <input type="radio" name="rating-1" class="mask mask-star" onClick={() => setRating(4)} defaultChecked={rating === 4} />
                        <input type="radio" name="rating-1" class="mask mask-star" onClick={() => setRating(5)} defaultChecked={rating === 5} />
                    </div>


                    <textarea type="text" name='review' placeholder="Your View" class="input input-bordered input-error w-full lg:w-96 max-w-xs mt-4" />
                    <br />

                    <input type="submit" className='btn  btn-outline mt-2 w-full max-w-xs ' value='Submit' />






                </form>



            </div>


        </>



    );
};

export default MyReview;
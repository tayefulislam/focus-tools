import { data } from 'autoprefixer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
const MyReview = () => {


    const [rating, setRating] = useState(1);

    const [user, loading, error] = useAuthState(auth);


    const url = `http://localhost:5000/myreview/${user?.email}`;

    const { data, isLoading, refetch } = useQuery('onlyMyReview', () => fetch(url, {
        headers: {
            authentication: `Bearer ${localStorage.getItem('accessToken')}`
        }

    }).then(res => res.json()))

    console.log(data?.rating)







    const handleSumit = (event) => {
        event.preventDefault()

        const review = {
            rating: rating,
            myReview: event.target.review.value,
            email: user?.email,
            userName: user?.displayName
        }
        console.log(review)

        const url = `http://localhost:5000/updateReview/${user?.email}`;



        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                authentication: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(review)

        })

            .then(res => res.json())
            .then(data => {

                console.log(data)


                if (data.upsertedCount > 0) {
                    toast.success('Review Added')
                }
                if (data.modifiedCount > 0) {
                    toast.success('Review Updated')
                }
                if (data.matchedCount > 0 && (data.modifiedCount === 0 && data.upsertedCount === 0)) {
                    toast.error('Please Change Something to Update')
                }

                refetch()

            })



    }


    console.log(rating)
    return (
        <>
            <h1 className='text-center text-2xl font-bold'>My Review</h1>

            <h1 className='text-center text-xl font-semibold'>Positive reviews from awesome customers like you, help us to improve service.</h1>


            <div className='flex justify-center items-center'>





                <form onSubmit={handleSumit} >





                    <div className="rating  flex justify-center items-center ">
                        <input type="radio" name="rating-1" className="mask mask-star" onClick={() => setRating(1)} defaultChecked={rating === 1} />
                        <input type="radio" name="rating-1" className="mask mask-star" onClick={() => setRating(2)} defaultChecked={rating === 2} />
                        <input type="radio" name="rating-1" className="mask mask-star" onClick={() => setRating(3)} defaultChecked={rating === 3} />
                        <input type="radio" name="rating-1" className="mask mask-star" onClick={() => setRating(4)} defaultChecked={rating === 4} />
                        <input type="radio" name="rating-1" className="mask mask-star" onClick={() => setRating(5)} defaultChecked={rating === 5} />
                    </div>


                    <textarea type="text" name='review' placeholder="Your Review" defaultValue={data?.myReview} className="input input-bordered input-error w-full lg:w-96 max-w-xs mt-4" />
                    <br />

                    {
                        data?.myReview ? <input type="submit" className='btn  btn-outline mt-2 w-full max-w-xs ' value='Update Review' /> : <input type="submit" className='btn  btn-outline mt-2 w-full max-w-xs ' value='Submit' />
                    }






                </form>






            </div>


            {
                data?.rating && <div className='mt-6 w-full'>
                    <h1 className='text-center text-2xl'>My Previous Review</h1>

                    <div className='flex justify-center items-center flex-row'>

                        <div >
                            <h1 className='text-center text-2xl text-red-500 font-bold' >Rating : {`${data?.rating} / 5`}</h1>


                            <p className='text-center text-xl  w-full px-2'><span className='font-bold'>Review : </span> {data?.myReview}</p>


                        </div>

                    </div>


                </div>
            }





        </>



    );
};

export default MyReview;
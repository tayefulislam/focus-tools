import React, { useEffect, useState } from 'react';
import './TrackItem.css'

const TrackItem = () => {

    const [trackItem, setTrackItem] = useState([])

    const [trackIdMain, setTrackIdMain] = useState('0000')



    const handelTrack = (event) => {



        event.preventDefault()

        const trackId = event.target.trackid.value;
        setTrackIdMain(trackId)





    }

    console.log(trackItem)


    useEffect(() => {

        fetch(`https://vast-springs-92836.herokuapp.com/trackItem/${trackIdMain}`)

            // fetch(`https://vast-springs-92836.herokuapp.com/item/${trackIdMain}`)

            .then(res => res.json())
            .then(data => {
                setTrackItem(data)
                console.log(data)
            })
    }, [trackIdMain])

    console.log()



    return (
        < div className='track-item mt-10'>

            <h1 className='text-center text-4xl text-white'>Track Item</h1>

            <form onSubmit={handelTrack} className='flex justify-center items-center mb-10'>


                <div >

                    <input type="text" className="input input-bordered input-accent w-full max-w-xs" name='trackid' placeholder="Tack Item by Track Id" />

                    <input className='btn  w-full max-w-xs' type="submit" value="Track" />


                </div>





            </form>




            <div>

                <img className='w-48 mx-auto rounded-full' src={trackItem?.image} alt="" />

                <h1 className='text-center text-white text-bold'>{trackItem?.name}</h1>
                <h1 className='text-center text-white text-bold'> Availble Quantity :{trackItem?.quantity}</h1>


            </div>







        </div>


    );
};

export default TrackItem;
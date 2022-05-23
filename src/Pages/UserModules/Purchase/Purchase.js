import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Purchase = () => {

    const { id } = useParams()

    const [item, setItem] = useState({})

    let [minOrder, setMinOrder] = useState(0)



    useEffect(() => {

        const url = `http://localhost:5000/item/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setItem(data)
                setMinOrder(data?.minQrderQuantity)


            })
    }, [id])







    const handleIncrease = () => {

        minOrder = minOrder + 1;
        if (!minOrder) {
            return toast('Plase Enter an valid number')
        }
        setMinOrder(minOrder)


    }

    const handleDecrease = () => {
        minOrder = minOrder - 1;

        if (!minOrder) {
            return toast('Plase Enter an valid number')
        }

        setMinOrder(minOrder)
    }


    const handleChange = (event) => {

        const minNumberQuanity = parseInt(event?.target?.value);

        if (!minNumberQuanity) {
            return toast('Plase Enter an valid number')
        }

        setMinOrder(minNumberQuanity)


        console.log(minNumberQuanity)

    }

    console.log(minOrder)

    return (
        <div class="card w-full lg:w-96 bg-base-100 shadow-xl">
            <figure><img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">
                    Shoes!
                    <div class="badge badge-secondary">NEW</div>
                </h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div >


                    <div>


                        <input onChange={handleChange} type="number" value={minOrder} placeholder="Type here"

                            class="input input-bordered input-secondary w-full max-w-xs" />

                    </div>

                    <div className="card-actions justify-center">

                        <button className='badge badge-outline' onClick={handleIncrease} >Increase</button>


                        <button className='badge badge-outline' onClick={handleDecrease} >Decrease</button>


                    </div>





                </div>
            </div>
        </div>
    );
};

export default Purchase;
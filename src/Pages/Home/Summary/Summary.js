import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import './Summary.css'
const Summary = () => {


    const [items, setItems] = useState([])
    const [totalOrders, setTotalOrders] = useState([])
    const [totalShipped, setTotalShipped] = useState([])

    const url = `http://localhost:5000/items`;

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {

                setItems(data)


                console.log(data)

            })
    }, [])


    const urlOrders = `http://localhost:5000/totalOrder`;

    useEffect(() => {
        fetch(urlOrders)
            .then(res => res.json())
            .then(data => {

                setTotalOrders(data)


                console.log(data)

            })
    }, [])

    const urlShipped = `http://localhost:5000/totalShipped`;

    useEffect(() => {
        fetch(urlShipped)
            .then(res => res.json())
            .then(data => {

                setTotalShipped(data)


                console.log(data)

            })
    }, [])





    console.log(totalOrders)






    return (

        <>


            <div className='summary mt-5'>

                <h1 className='text-4xl'>Business Summary</h1>

                <div className='count mt-2'>



                    <div>
                        <h2>Total Item</h2>
                        <CountUp className='text-dark fs-1'
                            start={0}
                            end={items.length}
                            duration={3}></CountUp>
                        +
                    </div>
                    <div>
                        <h2>Total Orders</h2>
                        <CountUp className='text-dark fs-1'
                            start={0}
                            end={totalOrders.length}
                            duration={3}> </CountUp>
                        +
                    </div>

                    <div>
                        <h2>Total Delivered</h2>
                        <CountUp className='text-dark fs-1'
                            start={0}
                            end={totalShipped.length}
                            duration={3}> </CountUp>
                        +
                    </div>



                </div>

            </div>

        </>

    );
};

export default Summary;
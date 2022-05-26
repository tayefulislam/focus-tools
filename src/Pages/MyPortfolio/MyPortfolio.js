import React from 'react';
import { Link } from 'react-router-dom';

const MyPortfolio = () => {
    return (

        <div className='flex justify-center items-center'>

            <div class="card w-96 bg-base-100 shadow-xl">

                <div class="card-body items-center text-center">
                    <div class="avatar online">
                        <div class="w-24 rounded-full">
                            <img src="https://phero-web.nyc3.cdn.digitaloceanspaces.com/website-prod-images/public/files/1640512633829.jpg" />
                        </div>
                    </div>
                    <h2 class="card-title text-2xl font-bold">My Portfolio</h2>
                    <h2 class="card-title text-xl ">Kazi Tayeful Islam</h2>

                    <p>Department of Marketing <br />
                        Khilgaon Model University<br />
                        November 2021 - Current
                    </p>
                    <p><span className='font-bold'>SKills</span> : CSS, Tailwind ,Bootstrap, JavaScript (ES6), React.js , Node.js, Express.js, MongoDB, Web Hosting.</p>
                    <div class="card-actions">
                        <h1 className='text-2xl'>Live Project Link</h1>



                    </div>

                    <a href='https://to-do-en.web.app/'>My To Do</a>
                    <a href='https://square-inventory.netlify.app/'>Square Inventory</a>
                    <a href='https://doctors-portal-tayeful.netlify.app/'>Doctors Portal
                    </a>

                </div>
            </div>
        </div>

    );
};

export default MyPortfolio;
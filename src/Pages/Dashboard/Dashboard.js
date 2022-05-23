import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div class="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
                {/* <!-- Page content here --> */}

                {/* <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}

                <h1 className='text-center text-4xl mt-3'>Welcome to Dashboard</h1>

                <Outlet />


            </div>
            <div class="drawer-side">
                <label for="my-drawer-2" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <li><Link to='/dashboard'>My Appointment</Link></li>





                </ul>

            </div>
        </div>
    );
};

export default Dashboard;
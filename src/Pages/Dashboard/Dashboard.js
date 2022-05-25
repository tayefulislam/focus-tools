import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Dashboard.css'
const Dashboard = () => {
    return (
        <div class="drawer drawer-mobile ">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">

                <Outlet />


            </div>
            <div class="drawer-side ">
                <label for="my-drawer-2" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">


                    <li><Link to='/dashboard/myreview'>My Reviews</Link></li>

                    <li><Link to='/dashboard/myoders'>My Orders</Link></li>
                    <li><Link to='/dashboard/myprofile'>My Profile</Link></li>


                    <li><Link to='/dashboard/addproduct'>Add Product</Link></li>
                    <li><Link to='/dashboard/manageuser'>Manage User</Link></li>



                </ul>

            </div>
        </div>
    );
};

export default Dashboard;
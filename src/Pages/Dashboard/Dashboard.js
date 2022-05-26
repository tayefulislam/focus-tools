import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import './Dashboard.css'
const Dashboard = () => {


    const [user, loading, error] = useAuthState(auth);
    const url = `http://localhost:5000/myprofile/${user?.email}`
    const { data, refetch } = useQuery('isAdmin', () => fetch(url, {
        headers: {
            authentication: `Bearer ${localStorage.getItem('accessToken')}`
        }

    })
        .then(res => res.json()))

    // console.log(data)



    return (
        <div className="drawer drawer-mobile ">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">

                <Outlet />


            </div>
            <div className="drawer-side ">
                <label for="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">


                    {
                        data?.role !== 'admin' && <>

                            <li><Link to='/dashboard/myreview'>My Reviews</Link></li>

                            <li><Link to='/dashboard/myoders'>My Orders</Link></li>

                        </>
                    }



                    {/* only admin can see */}


                    {

                        data?.role === 'admin' && <>

                            <li><Link to='/dashboard/addproduct'>Add Product</Link></li>
                            <li><Link to='/dashboard/manageuser'>Manage User</Link></li>
                            <li><Link to='/dashboard/manageOrders'>Manage Orders</Link></li>
                            <li><Link to='/dashboard/manageProducts'>Manage Produts</Link></li>

                        </>



                    }

                    {/* common route */}

                    <li><Link to='/dashboard/myprofile'>My Profile</Link></li>







                </ul>

            </div>
        </div>
    );
};

export default Dashboard;
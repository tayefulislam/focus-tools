import React from 'react';
import { Link } from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import auth from './../../../firebase.init';

const Header = () => {

    const [user, loading, error] = useAuthState(auth);

    console.log(user)

    const manus = <>

        <li><Link to='/dashboard'>Dashboard</Link></li>
        <li><Link to='/myportfolio'>My Portfolio</Link></li>
        {
            user ? <li><button onClick={() => signOut(auth)}>signOut</button></li> : <li><Link to='/login'>Login</Link></li>
        }


    </>
    return (
        <div className="navbar bg-base-100 mb-12">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabindex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabindex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">

                        {manus}

                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">Focus Tools</Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal p-0">

                    {manus}


                </ul>




            </div>

            <label tabIndex="1" for="my-drawer-2" className="btn btn-ghost lg:hidden navbar-end"><span className='text-xl mx-1'>Dashboard</span>
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg> */}
            </label>






        </div>
    );
};

export default Header;
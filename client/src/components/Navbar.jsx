import React from 'react'
import logo from '../assets/logo.png'
import '../styles/Navbar.scss'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/state";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {

    const user = useSelector((state) => state.user);


    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(setLogout());
    }

    return (
        <div className="navbar-container">
            <div className="navbar_left">
                <img src={logo} alt="" />
                <div className="home">
                    <Link to='/'>24 EDUCATION</Link>
                </div>
            </div>
            <div className="navbar_midlle">
                <Link to='/'>Home</Link>
                <Link to='/introduction'>Introduction</Link>
                {user?.role === 'Student' &&
                    <Link to='/learning'>Learning</Link>
                }
                {
                    user?.role === 'Instructor' &&
                    <Link to='/teaching'>Teaching</Link>
                }
                {
                    user?.role === 'Admin' &&
                    <>
                        <Link to='/manageAccount'>Account</Link>
                        <Link to='/manageTuition'>Tuition</Link>
                        <Link to='/manageOverall'>Overall</Link>
                    </>
                }
            </div>

            <div className="navbar_right">
                {
                    user ?
                        <>
                            <div className="dropdown-profile">
                                <div className="profile">
                                    <FaUserCircle />
                                </div>
                                <div >
                                    <ul className="nav-profile-dropdown">
                                        <li><Link to='/profile' >Profile</Link></li>
                                        {user.role === 'Student' &&
                                            <div>
                                                <li><Link to='/studentManage'>Manage</Link></li>
                                                <li><Link to='/tuition'>Tuition</Link></li>
                                            </div>
                                        }
                                        <li onClick={handleLogout}><Link to='/'>Logout</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <a><Link to='/login'>Login</Link></a>
                        </>
                }
            </div>
        </div>
    )
}

export default Navbar
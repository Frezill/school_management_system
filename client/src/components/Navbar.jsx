import React from 'react'
import logo from '../assets/logo.png'
import '../styles/Navbar.scss'
import { Link } from 'react-router-dom';

const Navbar = () => {
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
                <Link to='/learning'>Learning</Link>
            </div>
            <div className="navbar_right">
                <a><Link to='/login'>Login</Link></a>
                <a>|</a>
                <a><Link to='/register'>Register</Link></a>
            </div>
        </div>
    )
}

export default Navbar
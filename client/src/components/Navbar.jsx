import React from 'react'
import logo from '../assets/logo.png'
import '../styles/Navbar.scss'
import { CiLogin } from "react-icons/ci";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <img src={logo} alt="" />

                <Link to='/'>24 EDUCATION</Link>
            </div>
            <div className="navbar-midlle">
                <Link to='/'>Home</Link>
                <Link to='/introduction'>Introduction</Link>
                <Link to='/news'>News</Link>
                <Link to='/learning'>Learning</Link>
            </div>
            <div className="navbar-right">
                <p><CiLogin /></p>
                <a href=""> Login</a>
            </div>
        </div>
    )
}

export default Navbar
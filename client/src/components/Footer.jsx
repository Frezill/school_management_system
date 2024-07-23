import React from 'react'
import '../styles/Footer.scss'
import { FaFacebook, FaYoutube, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-top">
                <div className="footer-left">
                    <h2>24 Education</h2>
                    <p>
                        There's a good chance "24 Education" refers to two things. It could be a general term for various popular online learning platforms in 2024, like Udemy or Coursera, offering courses from universities on many subjects. These platforms target individual learners and often provide certificates. Alternatively, "24 Education" might be a specific school management software called 24edu. This program improves communication within schools by integrating with tools like Microsoft Teams. It automates tasks and fosters better communication, aiming to enhance the teaching and learning experience.
                    </p>
                    <div className="icons">
                        <div className="icon"><FaFacebook /></div>
                        <div className="icon"><FaYoutube /></div>
                        <div className="icon"><FaTwitter /></div>
                    </div>
                </div>
                <div className="footer-midlle">
                    <h2>Information</h2>
                    <ul>
                        <li><strong>Email: </strong> 24education@gmail.com</li>
                        <li><strong>Phone: </strong> +84242424242</li>
                        <li><strong>Address: </strong> 30/4, Xuan Khanh, Ninh Kieu, Can Tho</li>
                        <li><strong>Fax: </strong>+84242 4242 424</li>
                    </ul>
                </div>
                <div className="footer-right">
                    <h2>Services </h2>
                    <ul>
                        <li>24 Library</li>
                        <li>24 Gym</li>
                        <li>24 Stadium</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                Copyright 2024 24education.com - All right Reserved
            </div>
        </div>
    )
}

export default Footer
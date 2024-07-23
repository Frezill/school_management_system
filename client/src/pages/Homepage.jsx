import React, { useEffect, useState } from 'react'
import '../styles/Homepage.scss'
import { university_images } from '../assets/assets'
import { FaUsers } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa";
import { LuMicroscope } from "react-icons/lu";
import { PiHandshakeDuotone } from "react-icons/pi";

const Homepage = () => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % university_images.length);
        }, 10000);

        return () => clearInterval(intervalId);
    }, [university_images]);

    return (
        <div className='homepage-container'>
            <div className="image">
                <img src={university_images[currentImageIndex]} />
            </div>
            <div className="content">
                <div className="title">
                    OUTSTANDING NUMBERS
                </div>
                <div className="description">
                    <div className="topic">
                        <div className="icon"><FaUsers /></div>
                        <div className="quantity">10000</div>
                        <div className="role">Student</div>
                    </div>
                    <div className="topic">
                        <div className="icon"><FaUserGraduate /></div>
                        <div className="quantity">500</div>
                        <div className="role">Professor</div>
                    </div>
                    <div className="topic">
                        <div className="icon"><LuMicroscope /></div>
                        <div className="quantity">600</div>
                        <div className="role">Scientific research article</div>
                    </div>
                    <div className="topic">
                        <div className="icon"><PiHandshakeDuotone /></div>
                        <div className="quantity">1100</div>
                        <div className="role">International project</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Homepage
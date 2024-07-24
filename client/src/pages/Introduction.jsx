import React from 'react'
import { assets } from '../assets/assets.jsx'
import '../styles/Introduction.scss'
import { FaEarthAfrica } from "react-icons/fa6";
import { FaTree } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { FaBookOpen } from "react-icons/fa";

const Introduction = () => {
    return (
        <div className="introduction-container">

            <div className="overview-container">
                <div className="images">
                    <img src={assets.university_5} />
                    <img src={assets.university_6} />
                </div>
                <div className="overview-content">
                    <h2>Overview</h2>
                    <p className='p1'>
                        There are two main possibilities for what "24 Education" might refer to. It could be a general term for a variety of online learning platforms that are popular in 2024. In this sense, it would encompass well-established platforms like Udemy, Coursera, and edX, which offer courses from prestigious universities and institutions on a wide range of subjects. These platforms cater to individual learners seeking to expand their knowledge and skillset, and often provide certification upon completion of courses.
                    </p>

                    <p className='p2'>
                        The other possibility is that "24 Education" refers to a specific software program called 24edu. This is a school management platform designed to improve communication and efficiency within educational institutions. 24edu integrates with popular tools like Microsoft Teams and Google Suite, allowing for seamless communication between teachers, students, and parents. It automates tasks like generating timetables, freeing up teachers' time for more focused instruction. By streamlining administrative processes and fostering better communication, 24edu aims to enhance the overall teaching and learning experience.
                    </p>
                    <p className='p3'>
                        So, depending on the context, "24 Education" could refer to the general landscape of online learning platforms in 2024, or it could be a specific school management software program.
                    </p>
                </div>
            </div>

            <div className="infographic-container">
                <div className="infographic">
                    <b className='infographic-icon'><FaEarthAfrica /></b>
                    <b className='infographic-title'>Mission</b>
                    <b className='infographic-description'>24 Education is a place to train elite people in a liberal learning environment, scientific research and contemporary technology transfer, developing a prosperous society</b>
                </div>
                <div className="infographic">
                    <b className='infographic-icon'><FaTree /></b>
                    <b className='infographic-title'>Vision</b>
                    <b className='infographic-description'>24 Education is a place of convergence, interference and production of knowledge - culture - science - technology, impacting sustainable social development</b>
                </div>
                <div className="infographic">
                    <b className='infographic-icon'><FiTarget /></b>
                    <b className='infographic-title'>Core values</b>
                    <b className='infographic-description'>Consensus - Dedication - Standards - Creativity</b>
                </div>
                <div className="infographic">
                    <b className='infographic-icon'><FaBookOpen /></b>
                    <b className='infographic-title'>Educational philosophy</b>
                    <b className='infographic-description'>For community, comprehensiveness, excellence</b>
                </div>
            </div>

            <div className="goal-container">
                <h2>Educational goals</h2>
                <p>
                    <br />
                    Training highly qualified human resources, improving people's knowledge, fostering talents; Scientific and technological research creates knowledge, new products and serves the community to meet the needs of socio-economic development, ensuring national defense, security and international integration.
                    <br /><br />
                    Training students to develop comprehensively in virtue, mind, body, and beauty; have knowledge, skills, and professional responsibility; Ability to grasp scientific and technological advances commensurate with training level, ability to self-study, be creative, and adapt to the working environment; Have a entrepreneurial spirit and a sense of serving the people
                </p>
            </div>

        </div>
    )
}

export default Introduction
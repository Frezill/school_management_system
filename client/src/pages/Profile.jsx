import React, { useEffect, useState } from 'react'
import '../styles/Profile.scss'
import { useSelector } from "react-redux";
import { getUserByIdService } from '../services/userService';
import logo from '../assets/logo2.png'

const Profile = () => {

    const [userData, setUserData] = useState({})

    const user = useSelector((state) => state.user);
    const url = import.meta.env.VITE_serverURL

    const getUserData = async () => {
        let id = user.id
        let response = await getUserByIdService(id)
        setUserData(response)
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <div className="profile-container">

            <div className="profile-content">
                <div className="top-content">
                    <img src={logo} alt="" />
                    <div className="title">
                        <a className='title-1'>24 EDUCATION</a>
                        <a className='title-2'>COLLEGE OF INFORMATION TECHNOLOGY</a>
                    </div>
                </div>
                <div className="bottom-content">
                    <div className="profile-left">
                        <img src={`${url}/images/${userData.profileImage}`} alt="" />
                    </div>
                    <div className="profile-right">
                        <a className='name'>{userData.firstName} {userData.lastName}</a>
                        <a className='content'><strong>{userData.role} ID: </strong>{userData.id}</a>
                        <a className='content'><strong>Major: </strong>{userData.major}</a>
                        <a className='content'><strong>Birthday: </strong>{userData.dob}</a>
                        <a className='content'><strong>Phone: </strong>{userData.phone}</a>
                        <a className='content'><strong>Email: </strong>{userData.email}</a>
                        <a className='content'><strong>Address: </strong>{userData.address}</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
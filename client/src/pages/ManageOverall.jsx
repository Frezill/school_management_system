import React, { useState } from 'react'
import '../styles/ManageOverall.scss'
import ManageSubject from '../components/ManageSubject'
import ManageSemester from '../components/ManageSemester'
import ManageMajor from '../components/ManageMajor'
import ManageAssign from '../components/ManageAssign'

const ManageOverall = () => {

    const [topic, setTopic] = useState(1)

    return (
        <div className="manage-overall-container">
            <div className="manage-overall-top">
                <div className="choose-topic">
                    <div className={topic == 1 ? "topic active" : "topic"} onClick={() => { setTopic(1) }}>
                        Subject
                    </div>
                    <div className={topic == 2 ? "topic active" : "topic"} onClick={() => { setTopic(2) }}>
                        Semester
                    </div>
                    <div className={topic == 3 ? "topic active" : "topic"} onClick={() => { setTopic(3) }}>
                        Major
                    </div>
                    <div className={topic == 4 ? "topic active" : "topic"} onClick={() => { setTopic(4) }}>
                        Assign
                    </div>
                </div>
            </div>
            <div className="manage-overall-bottom">
                {
                    topic === 1 &&
                    <ManageSubject />
                }
                {
                    topic === 2 &&
                    <ManageSemester />
                }
                {
                    topic === 3 &&
                    <ManageMajor />
                }
                {
                    topic === 4 &&
                    <ManageAssign />
                }
            </div>
        </div>
    )
}

export default ManageOverall
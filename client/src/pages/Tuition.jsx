import React, { useEffect, useState } from 'react'
import '../styles/Tuition.scss'
import { getSemesterService } from '../services/semesterService';
import { getEnrollmentForStudentService } from '../services/enrollmentService';
import { useSelector, useDispatch } from "react-redux";
import { Form } from 'react-bootstrap';
import { getTuitionById } from '../services/tuitionService';
import paidImage from '../assets/paid.png'

const Tuition = () => {

    const [semesterList, setSemesterList] = useState([])
    const [semesterId, setSemesterId] = useState(1)
    const [subjectList, setSubjectList] = useState([])
    const [tuitionData, setTuitionData] = useState([])

    const user = useSelector((state) => state.user);

    const getSemesterList = async () => {
        let response = await getSemesterService();
        setSemesterList(response.DT)
    }

    const getEnrollment = async () => {
        let userId = user.id
        let response = await getEnrollmentForStudentService(userId, semesterId)
        setSubjectList(response)
    }

    const getTuition = async () => {
        let student_id = user.id
        let semester_id = semesterId
        let response = await getTuitionById(student_id, semester_id)
        setTuitionData(response)
    }

    useEffect(() => {
        getSemesterList()
        getEnrollment()
        getTuition()
    }, [semesterId])

    return (
        <div className="tuition-container">
            <div className="tuition-top">
                <Form.Group className='mb-3' >
                    <Form.Select aria-label="" name='major_id' onChange={(event) => { setSemesterId(event.target.value) }}>
                        <option>Select your semester</option>
                        {
                            semesterList &&
                            semesterList.map((item, index) => (
                                <option value={item.id} key={`option - ${index}`}>{item.semester}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
            </div>
            <div className="tuition-bottom">
                <div className="student-information">
                    <h3>Tuition of {subjectList && subjectList[0]?.semester}</h3>
                    <a><strong>Name: </strong>{user.first_name} {user.last_name}</a>
                    <a><strong>Student ID: </strong>{user.id}</a>
                </div>
                <div className="tuition-information">
                    <div className="tuition-title">
                        <div className="tuition-name">ID</div>
                        <div className="tuition-name">Name</div>
                        <div className="tuition-name">Credits</div>
                        <div className="tuition-name">Tuition</div>
                    </div>
                    <div className="tuition-content">
                        {
                            subjectList &&
                            subjectList.map((item, index) => (
                                <div className="detail-tuition" key={`subject - ${index}`}>
                                    <div className="tuition-content">
                                        {item.subjectId}
                                    </div>
                                    <div className="tuition-content">
                                        {item.subjectName}
                                    </div>
                                    <div className="tuition-content">
                                        {item.subjectCredits}
                                    </div>
                                    <div className="tuition-content">
                                        {item.subjectTuition} $
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="tuition-total">
                    <div className='tuition-total-content'>
                        <a><strong>Total tuition: </strong>{tuitionData?.total_tuition ? `${tuitionData?.total_tuition} $` : '0 $'}</a>
                        <a><strong>Exemption: </strong>{tuitionData?.exemption ? tuitionData?.exemption : '0'}</a>
                        <a><strong>Must pay: </strong>{tuitionData?.last_tuition ? `${tuitionData?.last_tuition} $` : '0 $'}</a>
                        <a><strong>Due date: </strong>{tuitionData?.due_date ? tuitionData?.due_date.split('T')[0] : ''}</a>
                    </div>
                    {
                        tuitionData && tuitionData.paid &&
                        <img src={paidImage} alt="" />
                    }
                </div>
            </div>
        </div>
    )
}

export default Tuition
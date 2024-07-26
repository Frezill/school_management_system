import React, { useEffect, useState } from 'react'
import '../styles/Teaching.scss'
import { Form, Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { getSemesterService } from '../services/semesterService';
import { getStudentForTeacherService, getSubjectForTeacherService, giveScoreService, updateAttendanceEnrollmentService } from '../services/enrollmentService';

const Teaching = () => {

    const [semesterList, setSemesterList] = useState([])
    const [semesterId, setSemesterId] = useState(1)
    const [subjectList, setSubjectList] = useState([])
    const [currentSubject, setCurentSubject] = useState('')
    const [studentList, setStudentList] = useState([])

    const [showGiveScoreModal, setShowGiveScoreModal] = useState(false)
    const [giveScoreData, setGiveScoreData] = useState([])
    const [score, setScore] = useState()
    const [givedStudentId, setGivedStudentId] = useState('')

    const [showAttendanceModal, setShowAttendanceModal] = useState(false)
    const [day, setDay] = useState('')
    const [isAttendance, setIsAttendance] = useState('1')

    const user = useSelector((state) => state.user);

    const getSemesterList = async () => {
        let response = await getSemesterService();
        setSemesterList(response.DT)
    }

    const getSubjectForTeacher = async () => {
        let user_id = user.id
        let semester_id = semesterId
        let data = await getSubjectForTeacherService(user_id, semester_id)
        setSubjectList(data)
    }

    const fetchStudent = async () => {
        let subject_id = currentSubject;
        let semester_id = semesterId
        let data = await getStudentForTeacherService(subject_id, semester_id)
        setStudentList(data)
    }

    //give score

    const handleGiveScoreModal = (item) => {
        setShowGiveScoreModal(!showGiveScoreModal)
        setGiveScoreData(item)
        setGivedStudentId(item.studentId)
    }

    const handleGiveScoreButton = async () => {
        let user_id = givedStudentId
        let subject_id = currentSubject
        let semester_id = semesterId
        await giveScoreService(user_id, subject_id, semester_id, score)
        setShowGiveScoreModal(!showGiveScoreModal)
    }

    //attendance

    const handleAttendanceModal = (item) => {
        setShowAttendanceModal(!showAttendanceModal)
        setGiveScoreData(item)
        setGivedStudentId(item.studentId)
        setIsAttendance('1')
    }

    const handleAttendanceButton = async () => {
        let user_id = givedStudentId
        let subject_id = currentSubject
        let semester_id = semesterId
        await updateAttendanceEnrollmentService(user_id, subject_id, semester_id, day, isAttendance)
        setShowAttendanceModal(!showAttendanceModal)
    }

    const getDayNow = () => {
        let yourDate = new Date()
        yourDate = yourDate.toISOString().split('T')[0]
        setDay(yourDate)
    }

    useEffect(() => {
        getSemesterList()
        getSubjectForTeacher()
        fetchStudent()
    }, [semesterId, currentSubject, showGiveScoreModal, showAttendanceModal])

    useEffect(() => {
        getDayNow()
    }, [])

    return (
        <>
            <div className="teaching-container">
                <div className="learning-left">
                    {
                        subjectList &&
                        subjectList.map((item, index) => (
                            <div className={currentSubject === item.id ? "subject-select active" : "subject-select"} key={`subject - ${index}`} onClick={() => { setCurentSubject(item.id) }}>
                                <div className="subject-id">
                                    {item.id}
                                </div>
                                <div className="subject-name">
                                    {item.name}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="learning-right">
                    <div className="semester-bar">
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
                    <div className="student-container">
                        <div className="student-title d-flex flex-wrap justify-content-between">
                            <div className="col-sm-1 col-lg-1"></div>
                            <div className="col-sm-1 col-lg-1">ID</div>
                            <div className="col-sm-3 col-lg-3">Name</div>
                            <div className="email col-sm-2 col-lg-2">Email</div>
                            <div className="col-sm-2 col-lg-2">Score</div>
                            <div className="col-sm-1 col-lg-1"></div>
                            <div className="col-sm-1 col-lg-1"></div>
                            <div className="col-sm-1 col-lg-1"></div>
                        </div>
                        {
                            studentList &&
                            studentList.map((item, index) => (
                                <div className="detail-student d-flex flex-wrap justify-content-between" key={`subject - ${index}`}>
                                    <div className="col-sm-1 col-md-1 col-lg-1"></div>
                                    <div className="col-sm-1 col-md-1 col-lg-1">
                                        {item.studentId}
                                    </div>
                                    <div className="col-sm-3 col-md-3 col-lg-3">
                                        {item.studentFirst_name} {item.studentLast_name}
                                    </div>
                                    <div className="email col-sm-2 col-md-2 col-lg-2">
                                        {item.studentEmail}
                                    </div>
                                    <div className="col-sm-2 col-md-2 col-lg-2">
                                        {item?.score}
                                    </div>
                                    <div className="col-sm-1 col-md-1 col-lg-1">
                                        <button onClick={() => { handleGiveScoreModal(item) }}>Gives&nbsp;core</button>
                                    </div>
                                    <div className="col-sm-1 col-md-1 col-lg-1">
                                        <button onClick={() => { handleAttendanceModal(item) }}>Attendance</button>
                                    </div>
                                    <div className="col-sm-1 col-md-1 col-lg-1"></div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Modal show={showGiveScoreModal} onHide={handleGiveScoreModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Give score for {giveScoreData?.studentFirst_name} {giveScoreData?.studentLast_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        onChange={(event) => { setScore(event.target.value) }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleGiveScoreModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleGiveScoreButton}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                size="lg"
                show={showAttendanceModal}
                onHide={handleAttendanceModal}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Attendance of {giveScoreData?.studentFirst_name} {giveScoreData?.studentLast_name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="attendance">
                        {giveScoreData && giveScoreData.attendance &&
                            giveScoreData.attendance.map(([key, value]) => (
                                <div key={key} className={+value ? 'appearance' : 'absent'}>
                                    <p>{key}: {+value ? 'appearance' : 'absent'}</p>
                                </div>
                            ))}
                    </div>
                    <div className="check-attendance">
                        <Form.Control
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            onChange={(event) => { setDay(event.target.value) }}
                            placeholder='yyy-mm-dd'
                            value={day}
                        />
                        <Form.Select aria-label="Default select example" onChange={(event) => { setIsAttendance(event.target.value) }}>
                            <option value='1'>Appearance</option>
                            <option value="0">Absent</option>
                        </Form.Select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAttendanceModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAttendanceButton}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Teaching
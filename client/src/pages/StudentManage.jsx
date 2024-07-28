import React, { useEffect, useState } from 'react'
import '../styles/StudentManage.scss'
import { getSemesterService } from '../services/semesterService';
import { Form, Modal, Button } from 'react-bootstrap';
import { deleteEnrollmentService, getEnrollmentForStudentService } from '../services/enrollmentService';
import { useSelector, useDispatch } from "react-redux";
import StudentManageModal from '../components/StudentManageModal';

const StudentManage = () => {

    const [semesterList, setSemesterList] = useState([])
    const [semesterId, setSemesterId] = useState(1)
    const [subjectList, setSubjectList] = useState([])
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [modalData, setModalData] = useState({})

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteModalData, setDeleteModalData] = useState({})

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

    const handleDetailButton = (item) => {
        setModalData(item)
        setShowDetailModal(true)
    }

    const handleRemoveButton = (item) => {
        setDeleteModalData(item)
        setShowDeleteModal(true)
    }

    const hideModalDeleteModal = () => {
        setDeleteModalData({})
        setShowDeleteModal(false)
    }

    const handleConfirmDeleteButton = async () => {
        let user_id = user.id
        let semester_id = semesterId
        let subject_id = deleteModalData.subjectId
        await deleteEnrollmentService(user_id, semester_id, subject_id)
        hideModalDeleteModal()
    }

    useEffect(() => {
        getSemesterList()
        getEnrollment()
    }, [semesterId, showDeleteModal])

    return (
        <>
            <div className="student-manage-container">
                <div className="student-container-top">
                    <Form.Group className='mb-3' >
                        <Form.Select aria-label="" name='major_id' onChange={(event) => { setSemesterId(event.target.value) }}>
                            {
                                semesterList &&
                                semesterList.map((item, index) => (
                                    <option value={item.id} key={`option - ${index}`}>{item.semester}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                </div>
                <div className="student-container-bottom">
                    <div className="subject-title d-flex flex-wrap justify-content-between">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-1 col-lg-1">ID</div>
                        <div className="col-sm-3 col-lg-3">Name</div>
                        <div className="col-sm-2 col-lg-2">Credits</div>
                        <div className="col-sm-2 col-lg-2">Score</div>
                        <div className="col-sm-1 col-lg-1">Status</div>
                        <div className="col-sm-2 col-lg-2"></div>
                        <div className="col-sm-1"></div>
                    </div>
                    {
                        subjectList &&
                        subjectList.map((item, index) => (
                            <div className="detail-subject d-flex flex-wrap justify-content-between" key={`subject - ${index}`}>
                                <div className="col-sm-1"></div>
                                <div className="col-sm-1 col-lg-1">
                                    {item.subjectId}
                                </div>
                                <div className="col-sm-3 col-lg-3">
                                    {item.subjectName}
                                </div>
                                <div className="col-sm-2 col-lg-2">
                                    {item.subjectCredits}
                                </div>
                                <div className="col-sm-2 col-lg-2">
                                    {item?.score}
                                </div>
                                <div className="col-sm-1 col-lg-1">
                                    {item.completed ? 'Done' : 'Learning'}
                                </div>
                                <div className="col-sm-2 col-lg-2">
                                    <div className="enroll">
                                        <button onClick={() => { handleDetailButton(item) }}>View detail</button>
                                        <button className='danger' onClick={() => { handleRemoveButton(item) }}>Remove</button>
                                    </div>
                                </div>
                                <div className="col-sm-1 col-lg-1"></div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <StudentManageModal
                showDetailModal={showDetailModal}
                setShowDetailModal={setShowDetailModal}
                modalData={modalData}
            />
            <Modal show={showDeleteModal} onHide={hideModalDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete subject</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <strong>ID: </strong> {deleteModalData.subjectId}
                    <br />
                    <strong>Name: </strong> {deleteModalData.subjectName}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideModalDeleteModal}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDeleteButton}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default StudentManage
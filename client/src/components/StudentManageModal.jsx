import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import '../styles/StudentManageModal.scss'
import { getTeacherForStudentManageService } from '../services/enrollmentService';

const StudentManageModal = (props) => {

    const { showDetailModal, setShowDetailModal, modalData } = props

    const [instructorName, setInstructorName] = useState('')

    const getTeacher = async () => {
        let subject_id = modalData.subjectId;
        let semester_id = modalData.semesterId
        let name = await getTeacherForStudentManageService(subject_id, semester_id)
        setInstructorName(name)
    }

    useEffect(() => {
        getTeacher()
    }, [showDetailModal])

    return (
        <Modal
            size="lg"
            show={showDetailModal}
            onHide={() => setShowDetailModal(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    {modalData.subjectId} {modalData.subjectName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="student-modal-content">
                    <a><strong>Instructor: </strong>{instructorName}</a>
                    <a><strong>Semester: </strong>{modalData.semester}</a>
                    <a><strong>Score: </strong>{modalData.score}</a>
                    <a><strong>Completed: </strong>{modalData.completed ? 'DONE' : 'LEARNING'}</a>
                    <a><strong>Number of credits: </strong>{modalData.subjectCredits}</a>
                    <a><strong>Tuition: </strong>{parseFloat(+modalData.subjectTuition)} $</a>
                </div>

                <div className="student-modal-attendance">
                    <a><strong>Attendance</strong></a>
                    <div className="student-modal-attendance-content">
                        {modalData && modalData.attendance &&
                            modalData.attendance.map(([key, value]) => (
                                <div key={key} className={+value ? 'appearance' : 'absent'}>
                                    <p>{key}: {+value ? 'appearance' : 'absent'}</p>
                                </div>
                            ))}
                    </div>

                </div>
            </Modal.Body>
        </Modal>
    )
}

export default StudentManageModal
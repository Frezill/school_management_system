import React, { useEffect, useState } from 'react'
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { FaMagnifyingGlass } from "react-icons/fa6";
import ReactPaginate from 'react-paginate';
import { createAssignService, deleteEnrollmentService, getTeacherAssign } from '../services/enrollmentService';
import { getSemesterService } from '../services/semesterService';
import { getAllSubjectService } from '../services/subjectService';
import { getAllTeacherService } from '../services/userService';

const ManageAssign = () => {

    const [semesterList, setSemesterList] = useState([])
    const [subjectList, setSubjectList] = useState([])
    const [teacherList, setTeacherList] = useState([])
    const [semesterId, setSemesterId] = useState(1)
    const [assignList, setAssignList] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(100);

    const [assignSemesterId, setAssignSemesterId] = useState('')
    const [assignTeacherId, setAssignTeacherId] = useState('')
    const [assignSubjectId, setAssignSubjectid] = useState('')
    const [showAssignModal, setShowAssignModal] = useState(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteAssignData, setDeleteAssignData] = useState({})

    const fetchSemester = async () => {
        let limit = 10;
        let semester_id = semesterId;
        let response = await getTeacherAssign(searchValue, semester_id, page, limit)
        setAssignList(response.DT.data)
        setTotalPages(response.DT.totalPages)
    }

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    };

    const getData = async () => {
        let response1 = await getSemesterService();
        setSemesterList(response1.DT)

        let response2 = await getAllSubjectService()
        setSubjectList(response2.DT)

        let response3 = await getAllTeacherService()
        setTeacherList(response3.DT)
    }

    const handleHideModal = () => {
        setShowAssignModal(false)
        setAssignSemesterId('')
        setAssignTeacherId('')
        setAssignSubjectid('')
    }

    const handleAssignButton = async () => {
        await createAssignService(assignTeacherId, assignSemesterId, assignSubjectId)
        handleHideModal()
    }

    const handleShowDeleteModal = (item) => {
        setShowDeleteModal(!showDeleteModal)
        setDeleteAssignData(item)
    }

    const handleHideDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal)
        setDeleteAssignData({})
    }

    const handleConfirmDeleteModal = async () => {
        await deleteEnrollmentService(deleteAssignData.teacher_id, semesterId, deleteAssignData.subject_id)
        handleHideDeleteModal()
    }

    useEffect(() => {
        getData()
        fetchSemester()
    }, [searchValue, page, semesterId, showAssignModal, showDeleteModal])



    return (
        <>
            <div className="manage-topic-container">
                <div className="top-content">
                    <div className="search-content">
                        <input type="text" placeholder='Search by id or name' onChange={(event) => { setSearchValue(event.target.value); setPage(1) }} />
                        <i className='search-icon'><FaMagnifyingGlass /></i>
                    </div>
                    <div className="select-semester">
                        <Form.Group >
                            <Form.Select aria-label="" name='major_id' onChange={(event) => { setSemesterId(event.target.value); setPage(1) }}>
                                {
                                    semesterList &&
                                    semesterList.map((item, index) => (
                                        <option value={item.id} key={`option - ${index}`}>{item.semester}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className="create-button">
                        <button onClick={() => { setShowAssignModal(true) }}>Assign</button>
                    </div>
                </div>
                <div className="manage-topic-content">
                    <div className="topic-title d-flex flex-wrap justify-content-between">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-1 col-lg-1">Teacher Id</div>
                        <div className="col-sm-2 col-lg-2">Teacher name</div>
                        <div className="col-sm-1 col-lg-1">Subject Id</div>
                        <div className="col-sm-2 col-lg-2">Subject name</div>
                        <div className="col-sm-1 col-lg-1"></div>
                        <div className="col-sm-1"></div>
                    </div>
                    {
                        assignList &&
                        assignList.map((item, index) => (
                            <div className="detail-topic d-flex flex-wrap justify-content-between" key={`topic - ${index}`}>
                                <div className="col-sm-1"></div>
                                <div className="col-sm-1 col-lg-1">
                                    {item.teacher_id}
                                </div>
                                <div className="col-sm-2 col-lg-2">
                                    {item.teacher_name}
                                </div>
                                <div className="col-sm-1 col-lg-1">
                                    {item.subject_id}
                                </div>
                                <div className="col-sm-2 col-lg-2">
                                    {item.subject_name}
                                </div>
                                <div className="col-sm-1 col-lg-1">
                                    <div className="enroll">
                                        <button className='danger' onClick={() => { handleShowDeleteModal(item) }}>Delete</button>
                                    </div>
                                </div>
                                <div className="col-sm-1 col-lg-1"></div>
                            </div>
                        ))
                    }
                </div>
                <div className='paginate'>
                    {
                        totalPages > 0 &&
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={2}
                            marginPagesDisplayed={3}
                            pageCount={totalPages}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    }
                </div>
            </div>

            <Modal
                size="lg"
                show={showAssignModal}
                onHide={handleHideModal}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Assign teacher
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group >
                        <Form.Select aria-label="" name='major_id' onChange={(event) => { setAssignSemesterId(event.target.value) }}>
                            <option value=''>Select semester</option>
                            {
                                semesterList &&
                                semesterList.map((item, index) => (
                                    <option value={item.id} key={`option - ${index}`}>{item.semester}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    <br />
                    <Form.Group >
                        <Form.Select aria-label="" name='major_id' onChange={(event) => { setAssignSubjectid(event.target.value) }}>
                            <option value=''>Select subject</option>
                            {
                                subjectList &&
                                subjectList.map((item, index) => (
                                    <option value={item.id} key={`option - ${index}`}>{item.id} {item.name}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    <br />
                    <Form.Group >
                        <Form.Select aria-label="" name='major_id' onChange={(event) => { setAssignTeacherId(event.target.value) }}>
                            <option value=''>Select teacher</option>
                            {
                                teacherList &&
                                teacherList.map((item, index) => (
                                    <option value={item.id} key={`option - ${index}`}>{item.id} {item.first_name} {item.last_name}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleHideModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAssignButton}>
                        Assign
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteModal} onHide={handleHideDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete assignment</Modal.Title>
                </Modal.Header>
                <Modal.Body>Teacher: <strong>{deleteAssignData.teacher_id} {deleteAssignData.teacher_name}</strong><br /> Subject: <strong>{deleteAssignData.subject_id} {deleteAssignData.subject_name}</strong></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleHideDeleteModal}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDeleteModal}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ManageAssign
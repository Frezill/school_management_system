import React, { useEffect, useState } from 'react'
import { createSubjectService, deleteSubjectService, getSubjectService, searchSubjectService, updateSubjectService } from '../services/subjectService'
import '../styles/ManageSubject.scss'
import { FaMagnifyingGlass } from "react-icons/fa6";
import ReactPaginate from 'react-paginate';
import { getSemesterService } from '../services/semesterService';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { createEnrollmentService } from '../services/enrollmentService';


const ManageSubject = () => {


    const [subjectList, setSubjectList] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(100);
    const [searchValue, setSearchValue] = useState('')
    const [semesterId, setSemesterId] = useState('')
    const [modalData, setModalData] = useState({
        id: '',
        name: '',
        number_of_credits: '',
        tuition: '',
        description: ''
    })
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteSubjectData, setDeleteSubjectData] = useState({})

    const user = useSelector((state) => state.user);

    const getSubjecList = async () => {
        let limit = 5;
        if (!searchValue) {
            let response = await getSubjectService(limit, page);
            setSubjectList(response.DT.subjects)
            setTotalPages(response.DT.totalPages)
        } else {
            let response = await searchSubjectService(searchValue, limit, page)
            setSubjectList(response.DT.subjects)
            setTotalPages(response.DT.totalPages)
        }
    }

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    };

    const handleOnchangeSearchValue = (event) => {
        setSearchValue(event.target.value)
        setPage(1)
    }

    const handleEnrollButton = async (item) => {
        let user_id = user?.id;
        let semester_id = semesterId
        let subject_id = item.id
        await createEnrollmentService(user_id, semester_id, subject_id)
    }

    const handleShowModal = (item) => {
        if (!item) {
            setShowModal(true)
            setModalType('create')
        } else {
            setShowModal(true)
            setModalType('update')
            setModalData(item)
        }
    }

    const handleHideModal = () => {
        setShowModal(false)
        setModalData({
            id: '',
            name: '',
            number_of_credits: '',
            tuition: '',
            description: ''
        })
    }

    const handleChange = (event) => {
        let { value, name } = event.target
        setModalData({
            ...modalData,
            [name]: value
        })
    }

    const handleCreateButton = async () => {
        if (modalType === 'create') {
            await createSubjectService(modalData)
        } else {
            await updateSubjectService(modalData)
        }

        handleHideModal()
    }

    const handleShowDeleteModal = (item) => {
        setShowDeleteModal(!showDeleteModal)
        setDeleteSubjectData(item)
    }

    const handleHideDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal)
        setDeleteSubjectData({})
    }

    const handleConfirmDeleteModal = async () => {
        let id = deleteSubjectData.id
        await deleteSubjectService(id)
        handleHideDeleteModal()
    }


    useEffect(() => {
        getSubjecList()
    }, [page, searchValue, showModal, showDeleteModal])

    return (
        <>
            <div className="manage-subject-container">
                <div className="top-content">
                    <div className="search-content">
                        <input type="text" placeholder='Search subject by id or name' onChange={handleOnchangeSearchValue} />
                        <i className='search-icon'><FaMagnifyingGlass /></i>
                    </div>
                    <div className="create-button">
                        <button onClick={() => { handleShowModal() }}>Create&nbsp;subject</button>
                    </div>
                </div>
                <div className="manage-subject-content">
                    <div className="subject-title d-flex flex-wrap justify-content-between">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-1 col-lg-1">ID</div>
                        <div className="col-sm-4 col-lg-4">Name</div>
                        <div className="col-sm-2 col-lg-2">Credit</div>
                        <div className="col-sm-2 col-lg-2">Tuition</div>
                        <div className="col-sm-2 col-lg-1"></div>
                        <div className="col-sm-1"></div>
                    </div>
                    {
                        subjectList &&
                        subjectList.map((item, index) => (
                            <div className="detail-subject d-flex flex-wrap justify-content-between" key={`subject - ${index}`}>
                                <div className="col-sm-1"></div>
                                <div className="col-sm-1 col-lg-1">
                                    {item.id}
                                </div>
                                <div className="col-sm-4 col-lg-4">
                                    {item.name}
                                </div>
                                <div className="col-sm-2 col-lg-2">
                                    {item.number_of_credits}
                                </div>
                                <div className="col-sm-2 col-lg-2">
                                    {parseFloat(item.tuition)} $
                                </div>
                                <div className="col-sm-2 col-lg-2">
                                    <div className="enroll">
                                        <button onClick={() => { handleShowModal(item) }}>Update</button>
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
                show={showModal}
                onHide={handleHideModal}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Subject modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label><strong>ID</strong></Form.Label>
                            <Form.Control type="text" value={modalData.id} placeholder="ID" name='id' onChange={handleChange} disabled={modalType === 'update' ? 'disabled' : ''} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label><strong>Name</strong></Form.Label>
                            <Form.Control type="text" value={modalData.name} placeholder="Name" name='name' onChange={handleChange} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label><strong>Number of credits</strong></Form.Label>
                            <Form.Control type="text" value={modalData.number_of_credits} placeholder="Number of credits" name='number_of_credits' onChange={handleChange} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label><strong>Tuition</strong></Form.Label>
                            <Form.Control type="text" value={modalData.tuition} placeholder="Tuition" name='tuition' onChange={handleChange} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label><strong>Description</strong></Form.Label>
                            <Form.Control type="text" value={modalData.description} as="textarea" rows={5} placeholder="Description" name='description' onChange={handleChange} />
                        </Form.Group>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleHideModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateButton}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteModal} onHide={handleHideDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete subject</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete subject: <strong>{deleteSubjectData.name}</strong><br /> ID: <strong>{deleteSubjectData.id}</strong></Modal.Body>
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

export default ManageSubject
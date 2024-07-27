import React, { useEffect, useState } from 'react'
import { createSemesterService, deleteSemesterService, getSemesterService, updateSemesterService } from '../services/semesterService';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { FaMagnifyingGlass } from "react-icons/fa6";

const ManageSemester = () => {

    const [semesterList, setSemesterList] = useState([])
    const [modalData, setModalData] = useState({
        id: '',
        semester: ''
    })
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteSemesterData, setDeleteSemesterData] = useState({})
    const [searchValue, setSearchValue] = useState('')

    const fetchSemester = async () => {
        let response = await getSemesterService(searchValue)
        setSemesterList(response.DT)
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
            semester: ''
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
        let semester = modalData.semester
        let id = modalData?.id
        if (modalType === 'create') {
            await createSemesterService(semester)
        } else {
            await updateSemesterService(id, semester)
        }

        handleHideModal()
    }

    const handleShowDeleteModal = (item) => {
        setShowDeleteModal(!showDeleteModal)
        setDeleteSemesterData(item)
    }

    const handleHideDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal)
        setDeleteSemesterData({})
    }

    const handleConfirmDeleteModal = async () => {
        let id = deleteSemesterData.id
        await deleteSemesterService(id)
        handleHideDeleteModal()
    }


    useEffect(() => {
        fetchSemester()
    }, [showModal, showDeleteModal, searchValue])


    return (
        <>
            <div className="manage-topic-container">
                <div className="top-content">
                    <div className="search-content">
                        <input type="text" placeholder='Search by name (semester year-year)' onChange={(event) => { setSearchValue(event.target.value) }} />
                        <i className='search-icon'><FaMagnifyingGlass /></i>
                    </div>
                    <div className="create-button">
                        <button onClick={() => { handleShowModal() }}>Create&nbsp;semester</button>
                    </div>
                </div>
                <div className="manage-topic-content">
                    <div className="topic-title d-flex flex-wrap justify-content-between">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-1 col-lg-1">ID</div>
                        <div className="col-sm-3 col-lg-3">Name</div>
                        <div className="col-sm-2 col-lg-2"></div>
                        <div className="col-sm-1"></div>
                    </div>
                    {
                        semesterList &&
                        semesterList.map((item, index) => (
                            <div className="detail-topic d-flex flex-wrap justify-content-between" key={`topic - ${index}`}>
                                <div className="col-sm-1"></div>
                                <div className="col-sm-1 col-lg-1">
                                    {item.id}
                                </div>
                                <div className="col-sm-3 col-lg-3">
                                    {item.semester}
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
            </div>
            <Modal
                size="lg"
                show={showModal}
                onHide={handleHideModal}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Semester modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label><strong>Name</strong></Form.Label>
                            <Form.Control type="text" value={modalData.semester} placeholder="Name" name='semester' onChange={handleChange} />
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
                    <Modal.Title>Confirm delete semester</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete semester: <strong>{deleteSemesterData.semester}</strong><br /></Modal.Body>
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

export default ManageSemester
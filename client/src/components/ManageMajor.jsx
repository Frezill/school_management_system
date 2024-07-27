import React, { useEffect, useState } from 'react'
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { createMajorService, deleteMajorService, getMajorService, updateMajorService } from '../services/majorService';

const ManageMajor = () => {

    const [majorList, setMajorList] = useState([])
    const [modalData, setModalData] = useState({
        id: '',
        name: '',
        year: ''
    })
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('')
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteMajorData, setDeleteMajorData] = useState({})
    const [searchValue, setSearchValue] = useState('')

    const fetchSemester = async () => {
        let response = await getMajorService(searchValue)
        setMajorList(response.DT)
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
            year: ''
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
        let name = modalData?.name
        let year = modalData?.year
        let id = modalData?.id
        if (modalType === 'create') {
            await createMajorService(name, year)
        } else {
            await updateMajorService(id, name, year)
        }

        handleHideModal()
    }

    const handleShowDeleteModal = (item) => {
        setShowDeleteModal(!showDeleteModal)
        setDeleteMajorData(item)
    }

    const handleHideDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal)
        setDeleteMajorData({})
    }

    const handleConfirmDeleteModal = async () => {
        let id = deleteMajorData.id
        await deleteMajorService(id)
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
                        <input type="text" placeholder='Search by id or name' onChange={(event) => { setSearchValue(event.target.value) }} />
                        <i className='search-icon'><FaMagnifyingGlass /></i>
                    </div>
                    <div className="create-button">
                        <button onClick={() => { handleShowModal() }}>Create&nbsp;major</button>
                    </div>
                </div>
                <div className="manage-topic-content">
                    <div className="topic-title d-flex flex-wrap justify-content-between">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-1 col-lg-1">ID</div>
                        <div className="col-sm-3 col-lg-3">Name</div>
                        <div className="col-sm-1 col-lg-1">Year</div>
                        <div className="col-sm-2 col-lg-2"></div>
                        <div className="col-sm-1"></div>
                    </div>
                    {
                        majorList &&
                        majorList.map((item, index) => (
                            <div className="detail-topic d-flex flex-wrap justify-content-between" key={`topic - ${index}`}>
                                <div className="col-sm-1"></div>
                                <div className="col-sm-1 col-lg-1">
                                    {item.id}
                                </div>
                                <div className="col-sm-3 col-lg-3">
                                    {item.name}
                                </div>
                                <div className="col-sm-1 col-lg-1">
                                    {item.year}
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
                            <Form.Control type="text" value={modalData.name} placeholder="Name" name='name' onChange={handleChange} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label><strong>Year</strong></Form.Label>
                            <Form.Control type="text" value={modalData.year} placeholder="Year" name='year' onChange={handleChange} />
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
                    <Modal.Title>Confirm delete major</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete major: <strong>{deleteMajorData.name} {deleteMajorData.year}</strong><br /></Modal.Body>
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

export default ManageMajor
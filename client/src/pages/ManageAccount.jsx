import React, { useEffect, useState } from 'react'
import '../styles/ManageAccount.scss'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import { deleteUserService, getUserService, searchUserService, updateUserService } from '../services/userService';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Button, Modal, Col, Row, Form } from 'react-bootstrap';
const ManageAccount = () => {

    const [currentRole, setCurrentRole] = useState(1)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(100);
    const [searchValue, setSearchValue] = useState('')
    const [listUser, setListUser] = useState([])
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteUserData, setDeleteUserData] = useState({})

    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [updateModalData, setUpdateModalData] = useState({})

    const navigate = useNavigate()

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    };

    const fetchUser = async () => {
        setPage(1)
        let limit = 5;
        let role_id = currentRole
        let data = {}
        if (searchValue) {
            data = await searchUserService(limit, page, role_id, searchValue)
        } else {
            data = await getUserService(limit, page, role_id)
        }
        setListUser(data.users)
        setTotalPages(data.totalPages)
    }

    const handleOnchangeSearchValue = (event) => {
        setSearchValue(event.target.value)
        setPage(1)
    }

    //delete
    const handleShowDeleteModal = (item) => {
        setShowDeleteModal(!showDeleteModal)
        setDeleteUserData(item)
    }

    const handleHideDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal)
        setDeleteUserData({})
    }

    const handleConfirmDeleteModal = async () => {
        let role_id = deleteUserData.Role.id
        let user_id = deleteUserData.id
        await deleteUserService(user_id, role_id)
        handleHideDeleteModal()
    }

    //update
    const handleShowUpdateModal = (item) => {
        setShowUpdateModal(!showUpdateModal)
        let data = {
            id: item.id,
            first_name: item.first_name,
            last_name: item.last_name,
            phone: item.phone,
            address: item.address,
            dob: item.dob.split('T')[0]
        }
        setUpdateModalData(data)
    }

    const handleHideUpdateModal = () => {
        setShowUpdateModal(!showUpdateModal)
        setUpdateModalData({})
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setUpdateModalData({
            ...updateModalData,
            [name]: value
        })
    }

    const handleConfirmUpdateButton = async () => {
        await updateUserService(updateModalData)
        handleHideUpdateModal()
    }


    useEffect(() => {
        fetchUser()
    }, [page, currentRole, searchValue, showDeleteModal, showUpdateModal])

    return (
        <>
            <div className="manage-account-container">
                <div className="manage-account-top">
                    <div className="choose-role">
                        <div className={currentRole == 1 ? "role active" : "role"} onClick={() => { setCurrentRole(1) }}>
                            Student
                        </div>
                        <div className={currentRole == 2 ? "role active" : "role"} onClick={() => { setCurrentRole(2) }}>
                            Teacher
                        </div>
                        <div className={currentRole == 3 ? "role active" : "role"} onClick={() => { setCurrentRole(3) }}>
                            Admin
                        </div>
                    </div>
                    <div className="register-button">
                        <button onClick={() => { navigate('/register') }}>Register</button>
                    </div>
                </div>
                <div className="manage-account-content">
                    <div className="search-content">
                        <input type="text" placeholder='Search by id, name or major' onChange={handleOnchangeSearchValue} />
                        <i className='search-icon'><FaMagnifyingGlass /></i>
                    </div>
                    <div className="display-user-container">
                        <div className="title">
                            <div className="col-sm-1"></div>
                            <div className="col-sm-1">ID</div>
                            <div className="col-sm-2">Name</div>
                            <div className="col-sm-3">Email</div>
                            <div className="col-sm-3">Major</div>
                            <div className="col-sm-1"></div>
                            <div className="col-sm-1"></div>
                            <div className="col-sm-1"></div>
                        </div>

                        {
                            listUser &&
                            listUser.map((item, index) => (
                                <div className="detail-user" key={`user ${index}`}>
                                    <div className="col-sm-1"></div>
                                    <div className="col-sm-1">{item.id}</div>
                                    <div className="col-sm-2">{item.first_name} {item.last_name}</div>
                                    <div className="col-sm-3">{item.email}</div>
                                    <div className="col-sm-3">{item.Major.name} {item.Major.year}</div>
                                    <div className="col-sm-1"><button className='btn btn-primary' onClick={() => { handleShowUpdateModal(item) }}>Update</button></div>
                                    <div className="col-sm-1"><button className='btn btn-danger' onClick={() => { handleShowDeleteModal(item) }}>Delete</button></div>
                                    <div className="col-sm-1"></div>
                                </div>
                            ))
                        }

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
                </div>
            </div>
            <Modal show={showDeleteModal} onHide={handleHideDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete user: <strong>{deleteUserData.first_name}</strong> with ID: <strong>{deleteUserData.id}</strong></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleHideDeleteModal}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDeleteModal}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                size="lg"
                show={showUpdateModal}
                onHide={handleHideUpdateModal}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Update User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label><strong>First name</strong></Form.Label>
                            <Form.Control type="text" value={updateModalData.first_name} placeholder="First name" name='first_name' onChange={handleChange} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label><strong>Last name</strong></Form.Label>
                            <Form.Control type="text" value={updateModalData.last_name} placeholder="Last name" name='last_name' onChange={handleChange} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label><strong>Birthday</strong></Form.Label>
                            <Form.Control type="text" value={updateModalData.dob} placeholder="yyyy-mm-dd" name='dob' onChange={handleChange} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label><strong>Phone number</strong></Form.Label>
                            <Form.Control type="text" value={updateModalData.phone} placeholder="Phone number" name='phone' onChange={handleChange} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label><strong>Address</strong></Form.Label>
                            <Form.Control type="text" value={updateModalData.address} placeholder="Address" name='address' onChange={handleChange} />
                        </Form.Group>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleHideUpdateModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleConfirmUpdateButton}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ManageAccount
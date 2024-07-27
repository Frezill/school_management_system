import React, { useEffect, useState } from 'react'
import { getTuitionService, payTuitionService } from '../services/tuitionService'
import '../styles/ManageTuition.scss'
import { FaMagnifyingGlass } from "react-icons/fa6";
import ReactPaginate from 'react-paginate';
import { getSemesterService } from '../services/semesterService';
import { Form, Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";

const ManageTuition = () => {

    const [tuitionList, setTuitionList] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(100);
    const [searchValue, setSearchValue] = useState('')
    const [semesterList, setSemesterList] = useState([])
    const [semesterId, setSemesterId] = useState(1)
    const [showPayModal, setShowPayModal] = useState(false)
    const [payModalData, setpayModalData] = useState({})

    const user = useSelector((state) => state.user);

    const fetchTuition = async () => {
        let limit = 5;
        let semester_id = semesterId
        let response = await getTuitionService(searchValue, semester_id, limit, page)
        setTotalPages(response.DT.totalPages)
        setTuitionList(response.DT.tuitions)
    }

    const getSemesterList = async () => {
        let response = await getSemesterService();
        setSemesterList(response.DT)
    }

    const handlePageClick = (event) => {
        setPage(event.selected + 1);
    };

    const handleOnchangeSearchValue = (event) => {
        setSearchValue(event.target.value)
        setPage(1)
    }

    const handleShowPayModal = (item) => {
        setShowPayModal(!showPayModal)
        setpayModalData(item)
    }

    const handleHidePayModal = () => {
        setShowPayModal(!showPayModal)
        setpayModalData({})
    }

    const handlePayButton = async () => {
        let student_id = payModalData.student_id
        let semester_id = payModalData.semester_id
        await payTuitionService(student_id, semester_id)
        handleHidePayModal()
    }

    useEffect(() => {
        getSemesterList()
        fetchTuition()
    }, [page, searchValue, semesterId, showPayModal])

    return (
        <>
            <div className="manage-tuition-container">
                <div className="top-content">
                    <div className="search-content">
                        <input type="text" placeholder='Search by id or name' onChange={handleOnchangeSearchValue} />
                        <i className='search-icon'><FaMagnifyingGlass /></i>
                    </div>

                    <div className="semester-content">
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

                </div>
                <div className="subject-content">
                    <div className="subject-title d-flex flex-wrap justify-content-between">
                        <div className="col-sm-1"></div>
                        <div className="col-sm-1 col-lg-1">ID</div>
                        <div className="col-sm-4 col-lg-4">Name</div>
                        <div className="col-sm-2 col-lg-2">Tuition</div>
                        <div className="col-sm-2 col-lg-2">Status</div>
                        <div className="col-sm-2 col-lg-1"></div>
                        <div className="col-sm-1"></div>
                    </div>
                    {
                        tuitionList &&
                        tuitionList.map((item, index) => (
                            <div className="detail-subject d-flex flex-wrap justify-content-between" key={`subject - ${index}`}>
                                <div className="col-sm-1"></div>
                                <div className="col-sm-1 col-lg-1">
                                    {item.student_id}
                                </div>
                                <div className="col-sm-4 col-lg-4">
                                    {item.studentName}
                                </div>
                                <div className="col-sm-2 col-lg-2">
                                    {item.last_tuition} $
                                </div>
                                <div className="col-sm-2 col-lg-2">
                                    {
                                        item.paid ? 'Paid' : 'Not Paid'
                                    }
                                </div>
                                <div className="col-sm-2 col-lg-2">
                                    <div className="enroll">
                                        <button onClick={() => handleShowPayModal(item)}>Pay</button>
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
            <Modal show={showPayModal} onHide={handleHidePayModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm pay tuition</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to this user pay tuition <br /> <strong>{payModalData.studentName}</strong> with ID: <strong>{payModalData.student_id}</strong></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleHidePayModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handlePayButton}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ManageTuition
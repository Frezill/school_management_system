import React, { useEffect, useState } from 'react'
import { getSubjectService, searchSubjectService } from '../services/subjectService'
import '../styles/Learning.scss'
import { FaMagnifyingGlass } from "react-icons/fa6";
import ReactPaginate from 'react-paginate';
import { getSemesterService } from '../services/semesterService';
import { Form } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { createEnrollmentService } from '../services/enrollmentService';

const Learning = () => {

    const [subjectList, setSubjectList] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(100);
    const [searchValue, setSearchValue] = useState('')
    const [semesterList, setSemesterList] = useState([])
    const [semesterId, setSemesterId] = useState('')

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

    const handleEnrollButton = async (item) => {
        let user_id = user?.id;
        let semester_id = semesterId
        let subject_id = item.id
        await createEnrollmentService(user_id, semester_id, subject_id)
    }

    useEffect(() => {
        getSemesterList()
        getSubjecList()
    }, [page, searchValue])

    return (
        <div className="learning-container">
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
                <div className="subject-title">
                    <div className="col-sm-1"></div>
                    <div className='col-sm-1'>ID</div>
                    <div className='col-sm-4'>Name</div>
                    <div className='col-sm-2'>Credit</div>
                    <div className='col-sm-2'>Tuition</div>
                    <div className='col-sm-2'></div>
                </div>
                {
                    subjectList &&
                    subjectList.map((item, index) => (
                        <div className="detail-subject" key={`subject - ${index}`}>
                            <div className="col-sm-1"></div>
                            <div className="col-sm-1">
                                {item.id}
                            </div>
                            <div className="col-sm-4">
                                {item.name}
                            </div>
                            <div className="col-sm-2">
                                {item.number_of_credits}
                            </div>
                            <div className="col-sm-2">
                                {parseFloat(item.tuition)} $
                            </div>
                            <div className="action col-sm-2">
                                <div className="enroll">
                                    <button onClick={() => { handleEnrollButton(item) }}>Enroll</button>
                                </div>
                            </div>
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
    )
}

export default Learning
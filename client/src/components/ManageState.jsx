import React, { useEffect, useState } from 'react'
import { getPeriodService, updatePayTuitionPeriodService, updateSubjectRegistrationPeriodService } from '../services/periodService'
import { Form } from 'react-bootstrap';
import { getSemesterService, updateSemesterActiveService } from '../services/semesterService';
import '../styles/ManageState.scss'


const ManageState = () => {

    const [periodList, setPeriodList] = useState([])
    const [semesterList, setSemesterList] = useState([])

    const fetchPeriod = async () => {
        let response = await getPeriodService()
        setPeriodList(response.DT)
    }

    const fetchSemester = async () => {
        let response = await getSemesterService()
        setSemesterList(response.DT)
    }

    const handleOnchangePeriod = async (event) => {
        let period = event.target.name
        if (period === 'subject_registration') {
            await updateSubjectRegistrationPeriodService()
        } else {
            await updatePayTuitionPeriodService()
        }
    }

    const handleOnChangeSemester = async (event) => {
        let id = event.target.name
        await updateSemesterActiveService(id)
    }



    useEffect(() => {
        fetchPeriod()
        fetchSemester()
    }, [])

    return (
        <div className="manage-state-container">
            <h3>Manage Active Period</h3>
            <div className="manage-period">
                {
                    periodList &&
                    periodList.map((item, index) => (
                        <Form key={`period - ${index}`}>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                defaultChecked={item.isActive}
                                name={item.name}
                                label={item.name === 'subject_registration' ? 'Subject registration period' : 'Pay tuition period'}
                                onChange={handleOnchangePeriod}
                            />
                        </Form>
                    ))
                }
            </div>
            <br />
            <h3>Manage Active Semester</h3>
            <div className="manage-semester">
                {
                    semesterList &&
                    semesterList.map((item, index) => (
                        <Form key={`semester - ${index}`}>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                defaultChecked={item.isActive}
                                name={item.id}
                                label={item.semester}
                                onChange={(event) => { handleOnChangeSemester(event) }}
                            />
                        </Form>
                    ))
                }
            </div>
        </div>
    )
}

export default ManageState
import { toast } from 'react-toastify';
import axios from '../setup/axios.jsx'

const getTuitionById = async (student_id, semester_id) => {
    try {
        let response = await axios.get(`detailTuition?student_id=${student_id}&semester_id=${semester_id}`)
        return response.DT;
    } catch (error) {
        console.log(error);
    }
}

const getTuitionService = async (searchValue, semester_id, limit, page) => {
    try {
        let response = await axios.get(`/tuition?searchValue=${searchValue}&semester_id=${semester_id}&limit=${limit}&page=${page}`)

        let tuitions = []
        response.DT.tuitions.map((item, index) => {
            let student_id = item.student_id
            let studentEmail = item.User.email
            let studentName = item.User.first_name + ' ' + item.User.last_name
            let semester_id = item.semester_id
            let last_tuition = item.last_tuition
            let total_tuition = item.total_tuition
            let due_date = item.due_date
            let paid = item.paid

            tuitions.push({ student_id, studentEmail, studentName, semester_id, last_tuition, total_tuition, due_date, paid })
        })

        response.DT.tuitions = tuitions
        return response

    } catch (error) {

    }
}

const payTuitionService = async (student_id, semester_id) => {
    try {
        let response = await axios.put('/payTuition', { student_id, semester_id })
        if (response.EC === 0) {
            toast.success(response.EM)
        } else {
            toast.error(response.EM)
        }
    } catch (error) {
        console.log(error);
    }
}

export { getTuitionById, getTuitionService, payTuitionService }
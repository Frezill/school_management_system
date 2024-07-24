import { toast } from 'react-toastify';
import axios from '../setup/axios.jsx'

const createEnrollmentService = async (user_id, semester_id, subject_id) => {
    try {
        let response = await axios.post('/enrollment', { user_id, semester_id, subject_id })
        if (response.EC === 0) {
            toast.success(response.EM)
        } else {
            toast.error(response.EM)
        }
    } catch (error) {
        console.log(error);
    }
}

export { createEnrollmentService }
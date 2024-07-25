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

export { getTuitionById }
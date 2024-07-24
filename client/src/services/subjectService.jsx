import { toast } from 'react-toastify';
import axios from '../setup/axios.jsx'

const getSubjectService = async (limit, page) => {
    return await axios.get(`/subject?limit=${limit}&page=${page}`)
}

const searchSubjectService = async (searchValue, limit, page) => {
    return await axios.get(`searchSubject?searchValue=${searchValue}&limit=${limit}&page=${page}`)
}

export { getSubjectService, searchSubjectService }
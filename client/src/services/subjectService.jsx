import { toast } from 'react-toastify';
import axios from '../setup/axios.jsx'

const getSubjectService = async (limit, page) => {
    return await axios.get(`/subject?limit=${limit}&page=${page}`)
}

const searchSubjectService = async (searchValue, limit, page) => {
    return await axios.get(`searchSubject?searchValue=${searchValue}&limit=${limit}&page=${page}`)
}

const createSubjectService = async (data) => {
    try {
        let response = await axios.post('/subject', data)
        if (response.EC === 0) {
            toast.success(response.EM)
        } else {
            toast.error(response.EM)
        }
    } catch (error) {
        console.log(error);
    }
}

const updateSubjectService = async (data) => {
    try {
        let response = await axios.put('/subject', data)
        if (response.EC === 0) {
            toast.success(response.EM)
        } else {
            toast.error(response.EM)
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteSubjectService = async (id) => {
    try {
        let response = await axios.delete(`/subject?id=${id}`)
        if (response.EC === 0) {
            toast.success(response.EM)
        } else {
            toast.error(response.EM)
        }
    } catch (error) {
        console.log(error);
    }
}

export { getSubjectService, searchSubjectService, createSubjectService, updateSubjectService, deleteSubjectService }
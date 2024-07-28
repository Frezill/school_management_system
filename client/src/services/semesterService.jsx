import { toast } from 'react-toastify';
import axios from '../setup/axios.jsx'

const getSemesterService = async (search_value) => {
    let searchValue = search_value || ' '
    return await axios.get(`/semester?searchValue=${searchValue}`)
}

const createSemesterService = async (semester) => {
    try {
        let response = await axios.post('/semester', { semester })
        if (response.EC === 0) {
            toast.success(response.EM)
        } else {
            toast.error(response.EM)
        }
    } catch (error) {
        console.log(error);
    }
}

const updateSemesterService = async (id, semester) => {
    try {
        let response = await axios.put('/semester', { id, semester })
        if (response.EC === 0) {
            toast.success(response.EM)
        } else {
            toast.error(response.EM)
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteSemesterService = async (id) => {
    try {
        let response = await axios.delete(`/semester?id=${id}`)
        if (response.EC === 0) {
            toast.success(response.EM)
        } else {
            toast.error(response.EM)
        }
    } catch (error) {
        console.log(error);
    }
}

const updateSemesterActiveService = async (id) => {
    try {
        let response = await axios.put('/semesterActive', { id })
        if (response.EC === 0) {
            toast.success(response.EM)
        } else {
            toast.error(response.EM)
        }
    } catch (error) {
        console.log(error);
    }
}

export { getSemesterService, createSemesterService, updateSemesterService, deleteSemesterService, updateSemesterActiveService }
import { toast } from 'react-toastify';
import axios from '../setup/axios.jsx'

const getMajorService = async (searchValue) => {
    return await axios.get(`/major?searchValue=${searchValue}`)
}

const createMajorService = async (name, year) => {
    try {
        let response = await axios.post('/major', { name, year })
        if (response.EC === 0) {
            toast.success(response.EM)
        } else {
            toast.error(response.EM)
        }
    } catch (error) {
        console.log(error);
    }
}

const updateMajorService = async (id, name, year) => {
    try {
        let response = await axios.put('/major', { id, name, year })
        if (response.EC === 0) {
            toast.success(response.EM)
        } else {
            toast.error(response.EM)
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteMajorService = async (id) => {
    try {
        let response = await axios.delete(`/major?id=${id}`)
        if (response.EC === 0) {
            toast.success(response.EM)
        } else {
            toast.error(resposne.EM)
        }
    } catch (error) {
        console.log(error);
    }
}

export { getMajorService, createMajorService, updateMajorService, deleteMajorService }
import { toast } from 'react-toastify';
import axios from '../setup/axios.jsx'

const getPeriodService = async () => {
    return await axios.get('/period')
}

const updatePayTuitionPeriodService = async () => {
    let response = await axios.put('/payTuitionPeriod')
    if (response.EC === 0) {
        toast.success(response.EM)
    } else {
        toast.error(response.EM)
    }
}

const updateSubjectRegistrationPeriodService = async () => {
    let response = await axios.put('/subjectRegistrationPeriod')
    if (response.EC === 0) {
        toast.success(response.EM)
    } else {
        toast.error(response.EM)
    }
}

export { getPeriodService, updatePayTuitionPeriodService, updateSubjectRegistrationPeriodService }
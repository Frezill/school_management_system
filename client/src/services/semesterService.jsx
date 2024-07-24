import { toast } from 'react-toastify';
import axios from '../setup/axios.jsx'

const getSemesterService = async () => {
    return await axios.get('semester')
}

export { getSemesterService }
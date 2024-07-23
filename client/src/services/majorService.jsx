import { toast } from 'react-toastify';
import axios from '../setup/axios.jsx'

const getMajorService = async () => {
    return await axios.get('/major')
}

export { getMajorService }
import { toast } from 'react-toastify';
import axios from '../setup/axios.jsx'

const getRoleService = async () => {
    return axios.get('role')
}

export { getRoleService }
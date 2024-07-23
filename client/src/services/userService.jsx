import { toast } from 'react-toastify';
import axios from '../setup/axios.jsx'

const registerNewUserService = async (data) => {
    try {
        let { password, confirmPassword, dob } = data
        if (password !== confirmPassword) {
            toast.warning('Password is not equal to confirm password')
            return
        }

        if (isNaN(Date.parse(dob))) {
            toast.warning('Invalid bithday')
            return
        }

        const register_form = new FormData()

        for (let key in data) {
            register_form.append(key, data[key])
        }

        register_form.append('role_id', '1')

        let response = await axios.post('/register', register_form)
        if (response.EC === 0) {
            toast.success(response.EM)
            return true;
        } else {
            toast.error(response.EM)
        }

    } catch (error) {
        console.log(error);
    }
}

const loginUserService = async (email, password) => {
    try {
        let response = await axios.post('/login', { email, password })
        if (response.EC === 0) {
            toast.success(response.EM)
            return response.DT.token
        } else {
            toast.error(response.EM)
        }
    } catch (error) {
        log(error)
    }
}

export { registerNewUserService, loginUserService }
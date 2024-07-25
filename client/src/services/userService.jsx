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

const getUserByIdService = async (id) => {
    try {
        let response = await axios.get(`detailUser?id=${id}`)
        if (response?.EC === 0) {
            let data = response.DT
            let user = {
                id: data.id,
                firstName: data.first_name,
                lastName: data.last_name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                major: data.Major.name,
                role: data.Role.name,
                profileImage: data.profileImage,
                dob: data.dob.split('T')[0]
            }
            return user;
        }
    } catch (error) {
        console.log(error);
    }
}

export { registerNewUserService, loginUserService, getUserByIdService }
const bcrypt = require('bcryptjs');
const db = require('../models/index.js')
const validator = require('validator');
const { createJWT } = require('../middleware/authentication.js');

const User = db.User;
const Role = db.Role
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);
}

const checkEmailExist = async (userEmail) => {
    let user = await User.findOne({ where: { email: userEmail } })
    if (user) {
        return true;
    } else {
        return false;
    }
}

const checkPhoneExist = async (userPhone) => {
    let user = await User.findOne({ where: { phone: userPhone } })
    if (user) {
        return true;
    } else {
        return false;
    }
}

const checkIdExist = async (id) => {
    let user = await User.findOne({ where: { id } })
    if (user) {
        return true;
    } else {
        return false;
    }
}

const registerNewUser = async (req, res) => {
    try {
        let { id, first_name, last_name, phone, email, password, address, dob, major_id, role_id } = req.body
        let profileImage = req.file

        if (!id || !first_name || !last_name || !phone || !password || !address || !dob || !major_id || !role_id) {
            return res.status(200).json({
                EC: 3,
                EM: 'Please enter all necessary information',
                DT: ''
            })
        }

        //check exist ID
        let idExisted = await checkIdExist(id)
        if (idExisted) {
            return res.status(200).json({
                EC: 3,
                EM: 'ID existed in server',
                DT: ''
            })
        }


        //check exist email
        let emailExisted = await checkEmailExist(email)
        if (emailExisted) {
            return res.status(200).json({
                EC: 3,
                EM: 'Email existed in server',
                DT: ''
            })
        }

        //check phone exist
        let phoneExisted = await checkPhoneExist(phone)
        if (phoneExisted) {
            return res.status(200).json({
                EC: 3,
                EM: 'Phone existed in server',
                DT: ''
            })
        }

        //check valid email
        let isValidEmail = validator.isEmail(email);
        if (!isValidEmail) {
            return res.status(200).json({
                EC: 3,
                EM: 'Invalid email',
                DT: ''
            })
        }

        //check password
        if (password.length < 6) {
            return res.status(200).json({
                EC: 3,
                EM: 'Length of password must more than 6 letters',
                DT: ''
            })
        }
        let hashedPassword = hashUserPassword(password)

        await User.create({ ...req.body, password: hashedPassword, profileImage: profileImage.filename })

        return res.status(201).json({
            EC: 0,
            EM: 'Create user successful',
            DT: ''
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: 1,
            EM: 'Error from server',
            DT: ''
        })
    }
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
}

const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({
            where: { email },
            include: {
                model: Role,
                attributes: ['name']
            }
        })
        if (user) {
            //check password
            let isCorrectPassword = checkPassword(password, user.password)
            if (!isCorrectPassword) {
                return res.status(200).json({
                    EC: 2,
                    EM: 'Wrong email or password',
                    DT: ''
                })
            }

            let payload = {
                id: user.id,
                last_name: user.last_name,
                first_name: user.first_name,
                email: user.email,
                address: user.address,
                role: user.Role.name
            }

            let token = createJWT(payload)

            res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
            return res.status(200).json({
                EC: 0,
                EM: 'Login successful',
                DT: {
                    token
                }
            })


        }
        return res.status(200).json({
            EC: 2,
            EM: 'Wrong email or password',
            DT: ''
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: 1,
            EM: 'Error from server',
            DT: ''
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({
            EC: 0,
            EM: 'Log out succeed',
            DT: ''
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: '1',
            EM: 'Error from server',
            DT: ''
        })
    }
}

module.exports = { registerNewUser, checkEmailExist, checkPhoneExist, loginUser, logoutUser }
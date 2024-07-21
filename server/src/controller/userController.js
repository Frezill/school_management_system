const db = require('../models/index.js')
const validator = require('validator');
const { checkEmailExist, checkPhoneExist } = require('./login-registerController.js')

const User = db.User

const getUser = async (req, res) => {
    try {
        let { limit, page } = req.query
        limit = +limit;
        page = +page;

        let offset = (page - 1) * limit
        const { count, rows } = await User.findAndCountAll({
            offset,
            limit,
            attributes: ['id', 'first_name', 'last_name', 'phone', 'email', 'address', 'dob'],
            include: [{
                model: db.Role,
                attributes: ['id', 'name', 'description']
            }, {
                model: db.Major,
                attributes: ['id', 'name', 'year']
            }],
        })

        let totalPages = Math.ceil(count / limit) //round

        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }

        return res.status(200).json({
            EC: 0,
            EM: 'Get users successful',
            DT: data
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

const getUserById = async (req, res) => {
    try {
        let { id } = req.query;
        if (!id) {
            return res.status(200).json({
                EC: 3,
                EM: 'Please enter ID to find user',
                DT: ''
            })
        }

        let data = await User.findOne(
            {
                where: { id },
                attributes: ['id', 'first_name', 'last_name', 'phone', 'email', 'address', 'dob', 'profileImage'],
                include: [{
                    model: db.Role,
                    attributes: ['id', 'name', 'description']
                }, {
                    model: db.Major,
                    attributes: ['id', 'name', 'year']
                }],
            }
        )
        if (!data) {
            return res.status(200).json({
                EC: 2,
                EM: 'Not found user in server',
                DT: ''
            })
        }
        return res.status(200).json({
            EC: 0,
            EM: 'Get user data successfull',
            DT: data
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

const updateUser = async (req, res) => {
    try {
        let { id, first_name, last_name, phone, email, address, dob } = req.body
        let profileImage = req.file

        let userExisted = await User.findOne({ where: { id } })
        if (!userExisted) {
            return res.status(200).json({
                EC: 2,
                EM: 'Not found user from server',
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
        if (!isValidEmail && email) {
            return res.status(200).json({
                EC: 3,
                EM: 'Invalid email',
                DT: ''
            })
        }

        await User.update({ first_name, last_name, phone, email, address, dob, profileImage: profileImage?.filename }, { where: { id } })

        return res.status(200).json({
            EC: 0,
            EM: 'Update user successful',
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

const deleteUser = async (req, res) => {
    try {
        let { id } = req.query
        await User.destroy({ where: { id } })
        return res.status(200).json({
            EC: 0,
            EM: 'Delete user successful',
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

module.exports = { getUser, getUserById, updateUser, deleteUser }
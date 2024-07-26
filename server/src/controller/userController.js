const db = require('../models/index.js')
const validator = require('validator');
const { Op } = require("sequelize");
const { checkEmailExist, checkPhoneExist } = require('./login-registerController.js')

const User = db.User
const Enrollment = db.Enrollment
const Tuition = db.Tuition
const Role = db.Role

const getUser = async (req, res) => {
    try {
        let { limit, page, role_id } = req.query
        limit = +limit;
        page = +page;

        let offset = (page - 1) * limit
        const { count, rows } = await User.findAndCountAll({
            offset,
            limit,
            attributes: ['id', 'first_name', 'last_name', 'phone', 'email', 'address', 'dob'],
            where: { '$Role.id$': { [Op.eq]: role_id } },
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
        let { id, first_name, last_name, phone, address, dob } = req.body

        let userExisted = await User.findOne({ where: { id } })
        if (!userExisted) {
            return res.status(200).json({
                EC: 2,
                EM: 'Not found user from server',
                DT: ''
            })
        }

        //check phone exist
        if (userExisted.phone !== phone) {
            let phoneExisted = await checkPhoneExist(phone)
            if (phoneExisted) {
                return res.status(200).json({
                    EC: 3,
                    EM: 'Phone existed in server',
                    DT: ''
                })
            }
        }

        await User.update({ first_name, last_name, phone, address, dob }, { where: { id } })

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
        let { id, role_id } = req.query

        if (+role_id === 3) {
            let user = await User.findAll({
                where: {
                    '$Role.id$': role_id,
                },
                include: {
                    model: Role
                }
            })
            if (user.length <= 2) {
                return res.status(200).json({
                    EC: 3,
                    EM: 'The number of admins must be greater than 2',
                    DT: ''
                })
            }
        }

        await User.destroy({ where: { id } })
        await Enrollment.destroy({ where: { user_id: id } })
        await Tuition.destroy({ where: { student_id: id } })
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

const searchUser = async (req, res) => {
    try {
        let { limit, page, role_id, searchValue } = req.query
        limit = +limit;
        page = +page;

        let offset = (page - 1) * limit
        const { count, rows } = await User.findAndCountAll({
            offset,
            limit,
            attributes: ['id', 'first_name', 'last_name', 'phone', 'email', 'address', 'dob'],
            where: {
                '$Role.id$': { [Op.eq]: role_id },
                [Op.or]:
                    [
                        { first_name: { [Op.like]: '%' + searchValue + '%' } },
                        { last_name: { [Op.like]: '%' + searchValue + '%' } },
                        { id: { [Op.like]: '%' + searchValue + '%' } },
                        { '$Major.name$': { [Op.like]: '%' + searchValue + '%' } }
                    ]
            },
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
            EM: 'Search users successful',
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

module.exports = { getUser, getUserById, updateUser, deleteUser, searchUser }
const db = require('../models/index.js')

let Role = db.Role

const postCreateRole = async (req, res) => {
    try {
        let { name, description } = req.body
        if (!name || !description) {
            return res.status(200).json({
                EC: 3,
                EM: 'Please enter all necessary information',
                DT: ''
            })
        }
        await Role.create(req.body)
        return res.status(201).json({
            EC: 0,
            EM: 'Create role successful',
            DT: ''
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: 1,
            EM: 'Error in server',
            DT: ''
        })
    }
}

const getRole = async (req, res) => {
    try {
        let response = await Role.findAll({ attributes: ['id', 'name', 'description'] });
        return res.status(200).json({
            EC: 0,
            EM: 'Get role successful',
            DT: response
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: 1,
            EM: 'Error in server',
            DT: ''
        })
    }
}

const getRoleById = async (req, res) => {
    try {
        let { id } = req.query
        let response = await Role.findOne({ where: { id }, attributes: ['id', 'name', 'description'] });

        if (!response) {
            return res.status(200).json({
                EC: 2,
                EM: 'Not found role',
                DT: ''
            })
        }

        return res.status(201).json({
            EC: 0,
            EM: 'Get detail role successful',
            DT: response
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: 1,
            EM: 'Error in server',
            DT: ''
        })
    }
}

const putUpdateRole = async (req, res) => {
    try {
        let { id, name, description } = req.body
        if (!id) {
            return res.status(200).json({
                EC: 3,
                EM: 'Please enter id of role to update',
                DT: ''
            })
        }

        let roleExisted = await Role.findOne({ where: { id } })
        if (!roleExisted) {
            return res.status(200).json({
                EC: 2,
                EM: 'No role found that need updating',
                DT: ''
            })
        }
        await Role.update({ name, description }, { where: { id } })
        return res.status(200).json({
            EC: 0,
            EM: 'Update role successful',
            DT: ''
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: 1,
            EM: 'Error in server',
            DT: ''
        })
    }
}

const deleteRole = async (req, res) => {
    try {
        let { id } = req.query
        if (!id) {
            return res.status(200).json({
                EC: 3,
                EM: 'Please enter id of role to delete',
                DT: ''
            })
        }

        let subject = await Role.findOne({ where: { id } })
        if (!subject) {
            return res.status(200).json({
                EC: 2,
                EM: 'No role found that need deleting',
                DT: ''
            })
        }

        await Role.destroy({ where: { id } })
        return res.status(200).json({
            EC: 0,
            EM: 'Delete role successful',
            DT: ''
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: 1,
            EM: 'Error in server',
            DT: ''
        })
    }
}

module.exports = { postCreateRole, getRole, getRoleById, putUpdateRole, deleteRole }
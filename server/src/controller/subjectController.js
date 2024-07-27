const db = require('../models/index.js')
const { Op } = require("sequelize")

const Subject = db.Subject
const Enrollment = db.Enrollment

const postCreateSubject = async (req, res) => {
    try {
        let { id, name, tuition, number_of_credits, description } = req.body
        if (!name || !tuition || !number_of_credits || !description) {
            return res.status(200).json({
                EC: 3,
                EM: 'Please enter all necessary information',
                DT: ''
            })
        }

        let subjectExisted = await Subject.findOne({ where: { id } })
        if (subjectExisted) {
            return res.status(200).json({
                EC: 3,
                EM: `${id} was existed in server`,
                DT: ''
            })
        }

        await Subject.create(req.body)
        return res.status(200).json({
            EC: 0,
            EM: 'Create subject successful',
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

const getSubject = async (req, res) => {
    try {
        let { limit, page } = req.query
        limit = +limit;
        page = +page;

        let offset = (page - 1) * limit
        const { count, rows } = await Subject.findAndCountAll({
            offset,
            limit,
            attributes: ['id', 'name', 'tuition', 'number_of_credits', 'description']
        });

        let totalPages = Math.ceil(count / limit) //round

        let data = {
            totalRows: count,
            totalPages: totalPages,
            subjects: rows
        }

        return res.status(201).json({
            EC: 0,
            EM: 'Get subject successful',
            DT: data
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

const getSubjectById = async (req, res) => {
    try {
        let { id } = req.query
        let response = await Subject.findOne({ where: { id }, attributes: ['id', 'name', 'tuition', 'number_of_credits', 'description'] });

        if (!response) {
            return res.status(200).json({
                EC: 2,
                EM: 'Not found subject',
                DT: ''
            })
        }

        return res.status(201).json({
            EC: 0,
            EM: 'Get detail subject successful',
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

const putUpdateSubject = async (req, res) => {
    try {
        let { id, name, tuition, number_of_credits, description } = req.body
        if (!id) {
            return res.status(200).json({
                EC: 3,
                EM: 'Please enter id of subject to update',
                DT: ''
            })
        }

        let subject = await Subject.findOne({ where: { id } })
        if (!subject) {
            return res.status(200).json({
                EC: 2,
                EM: 'No subjects found that need updating',
                DT: ''
            })
        }

        await Subject.update({ name, tuition, number_of_credits, description }, { where: { id } })
        return res.status(201).json({
            EC: 0,
            EM: 'Update subject successful',
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

const deleteSubject = async (req, res) => {
    try {
        let { id } = req.query
        if (!id) {
            return res.status(200).json({
                EC: 3,
                EM: 'Please enter id of subject to delete',
                DT: ''
            })
        }

        let subject = await Subject.findOne({ where: { id } })
        if (!subject) {
            return res.status(200).json({
                EC: 2,
                EM: 'No subjects found that need deleting',
                DT: ''
            })
        }

        await Enrollment.destroy({ where: { subject_id: id } })
        await Subject.destroy({ where: { id } })
        return res.status(200).json({
            EC: 0,
            EM: 'Delete subject successful',
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

const searchSubjectController = async (req, res) => {
    try {
        let { searchValue, limit, page } = req.query
        limit = +limit;
        page = +page;
        let offset = (page - 1) * limit
        let { count, rows } = await Subject.findAndCountAll({
            where: {
                // name: { [Op.like]: '%' + searchValue + '%' }
                [Op.or]:
                    [
                        { name: { [Op.like]: '%' + searchValue + '%' } },
                        { id: { [Op.like]: '%' + searchValue + '%' } }
                    ]
            },
            attributes: ['id', 'name', 'tuition', 'number_of_credits', 'description'],
            offset,
            limit,
        })

        let totalPages = Math.ceil(count / limit) //round

        let data = {
            totalRows: count,
            totalPages: totalPages,
            subjects: rows
        }

        return res.status(200).json({
            EC: 0,
            EM: 'Get search subject success',
            DT: data
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

const getAllSubject = async (req, res) => {
    try {

        let data = await Subject.findAll({
            attributes: ['id', 'name', 'tuition', 'number_of_credits', 'description']
        });

        return res.status(200).json({
            EC: 0,
            EM: 'Get subject successful',
            DT: data
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


module.exports = { postCreateSubject, getSubject, getSubjectById, putUpdateSubject, deleteSubject, searchSubjectController, getAllSubject }
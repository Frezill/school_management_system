const db = require('../models/index.js')
const { Op } = require("sequelize");

let Semester = db.Semester
let Enrollment = db.Enrollment

const postCreateSemester = async (req, res) => {
    try {
        let { semester } = req.body
        if (!semester) {
            return res.status(200).json({
                EC: 3,
                EM: 'Please enter all necessary information',
                DT: ''
            })
        }
        await Semester.create(req.body)
        return res.status(201).json({
            EC: 0,
            EM: 'Create semester successful',
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

const getSemester = async (req, res) => {
    try {
        let { searchValue } = req.query

        let response = []
        if (searchValue) {
            response = await Semester.findAll({
                where: {
                    semester: { [Op.like]: '%' + searchValue + '%' }
                },
                attributes: ['id', 'semester']
            });
        } else {
            response = await Semester.findAll({ attributes: ['id', 'semester', 'isActive'] });
        }
        return res.status(200).json({
            EC: 0,
            EM: 'Get semester successful',
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

const getSemesterById = async (req, res) => {
    try {
        let { id } = req.query
        let response = await Semester.findOne({ where: { id }, attributes: ['id', 'semester'] });

        if (!response) {
            return res.status(200).json({
                EC: 2,
                EM: 'Not found semester',
                DT: ''
            })
        }

        return res.status(201).json({
            EC: 0,
            EM: 'Get detail semester successful',
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

const putUpdateSemester = async (req, res) => {
    try {
        let { id, semester } = req.body
        if (!id) {
            return res.status(200).json({
                EC: 3,
                EM: 'Please enter id of semester to update',
                DT: ''
            })
        }

        let semesterExisted = await Semester.findOne({ where: { id } })
        if (!semesterExisted) {
            return res.status(200).json({
                EC: 2,
                EM: 'No semester found that need updating',
                DT: ''
            })
        }
        await Semester.update({ semester }, { where: { id } })
        return res.status(200).json({
            EC: 0,
            EM: 'Update semester successful',
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

const deleteSemester = async (req, res) => {
    try {
        let { id } = req.query
        if (!id) {
            return res.status(200).json({
                EC: 3,
                EM: 'Please enter id of semester to delete',
                DT: ''
            })
        }

        let semesterExisted = await Semester.findOne({ where: { id } })
        if (!semesterExisted) {
            return res.status(200).json({
                EC: 2,
                EM: 'No semester found that need deleting',
                DT: ''
            })
        }

        await Semester.destroy({ where: { id } })
        await Enrollment.destroy({ where: { semester_id: id } })
        return res.status(200).json({
            EC: 0,
            EM: 'Delete semester successful',
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

const updateSemesterActive = async (req, res) => {
    try {
        try {
            let { id } = req.body
            if (!id) {
                return res.status(200).json({
                    EC: 3,
                    EM: 'Please enter id of semester to update',
                    DT: ''
                })
            }

            let semesterExisted = await Semester.findOne({ where: { id } })
            if (!semesterExisted) {
                return res.status(200).json({
                    EC: 2,
                    EM: 'No semester found that need updating',
                    DT: ''
                })
            }
            await Semester.update({ isActive: !semesterExisted.isActive }, { where: { id } })
            return res.status(200).json({
                EC: 0,
                EM: 'Update semester state successful',
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
    } catch (error) {

    }
}

module.exports = { postCreateSemester, getSemester, getSemesterById, putUpdateSemester, deleteSemester, updateSemesterActive }
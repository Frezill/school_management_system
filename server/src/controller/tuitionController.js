const db = require('../models/index.js')
const { Op } = require("sequelize")

const User = db.User
const Subject = db.Subject
const Tuition = db.Tuition

const addTuition = async (req, res) => {
    try {
        let { student_id, subject_id, semester_id } = req.body

        if (!student_id || !subject_id || !semester_id || semester_id == '0') {
            return res.status(200).json({
                EC: 3,
                EM: 'Please enter all necessary information',
                DT: ''
            })
        }

        let user = await User.findOne({
            where: { id: student_id },
            attributes: ['id', 'first_name', 'last_name', 'phone', 'email', 'address', 'dob', 'profileImage'],
            include: {
                model: db.Role,
                attributes: ['id', 'name', 'description']
            }
        })

        if (user.Role.name === 'Student') {

            let subject = await Subject.findOne({ where: { id: subject_id } })

            let userTuition = await Tuition.findOne({ where: { student_id, semester_id } })

            if (userTuition) {
                let total_tuition = +userTuition.total_tuition + +subject.tuition
                let exemption = 0;
                let last_tuition = total_tuition - total_tuition * exemption;

                let now = new Date();
                let due_date = new Date(now.getFullYear(), now.getMonth() + 3, now.getDate());

                await Tuition.update({ total_tuition, last_tuition, due_date }, { where: { student_id, semester_id } })

                return res.status(201).json({
                    EC: 0,
                    EM: 'Update tuition bill successful',
                    DT: ''
                })
            } else {
                let total_tuition = subject.tuition
                let exemption = 0;
                let last_tuition = total_tuition - total_tuition * exemption;

                await Tuition.create({ student_id, total_tuition, exemption, last_tuition, semester_id })
                return res.status(201).json({
                    EC: 0,
                    EM: 'Create tuition bill successful',
                    DT: ''
                })
            }

        }

        return res.status(201).json({
            EC: 2,
            EM: 'You are not a student',
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

const removeTuition = async (req, res) => {
    try {
        let { student_id, subject_id, semester_id } = req.body
        let user = await User.findOne({
            where: { id: student_id },
            attributes: ['id', 'first_name', 'last_name', 'phone', 'email', 'address', 'dob', 'profileImage'],
            include: {
                model: db.Role,
                attributes: ['id', 'name', 'description']
            }
        })

        if (user.Role.name === 'student') {

            let subject = await Subject.findOne({ where: { id: subject_id } })

            let userTuition = await Tuition.findOne({ where: { student_id, semester_id } })

            if (userTuition) {
                let total_tuition = +userTuition.total_tuition - +subject.tuition
                let exemption = 0;
                let last_tuition = total_tuition - total_tuition * exemption;

                await Tuition.update({ total_tuition, last_tuition }, { where: { student_id, semester_id } })

                return res.status(201).json({
                    EC: 0,
                    EM: 'Update tuition bill successful',
                    DT: ''
                })
            } else {
                return res.status(201).json({
                    EC: 0,
                    EM: 'Not found tuition bill',
                    DT: ''
                })
            }

        }

        return res.status(201).json({
            EC: 2,
            EM: 'You are not a student',
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

const getTuition = async (req, res) => {
    try {
        let { limit, page, searchValue, semester_id } = req.query
        limit = +limit
        let offset = (page - 1) * limit

        const { count, rows } = await Tuition.findAndCountAll({
            offset,
            limit,
            where: {
                [Op.and]: [
                    {
                        [Op.or]:
                            [
                                { '$User.id$': { [Op.like]: '%' + searchValue + '%' } },
                                { '$User.first_name$': { [Op.like]: '%' + searchValue + '%' } },
                                { '$User.last_name$': { [Op.like]: '%' + searchValue + '%' } }
                            ]
                    },
                    { semester_id }
                ]
            },
            include: {
                model: User,
                attributes: ['id', 'first_name', 'last_name', 'phone', 'email', 'address', 'dob']
            }
        })

        let totalPages = Math.ceil(count / limit) //round

        let data = {
            totalRows: count,
            totalPages: totalPages,
            tuitions: rows
        }

        return res.status(200).json({
            EC: 0,
            EM: 'Get all tuition successfull',
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

const getTuitionById = async (req, res) => {
    try {
        let { student_id, semester_id } = req.query
        let data = await Tuition.findOne({ where: { semester_id, student_id } })
        return res.status(200).json({
            EC: 0,
            EM: 'Get tuition by ID successfull',
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

const payTuition = async (req, res) => {
    try {
        let { student_id, semester_id } = req.body
        await Tuition.update({ paid: true, payment_date: Date.now() }, { where: { student_id, semester_id } })
        return res.status(200).json({
            EC: 0,
            EM: 'Pay tuition successful',
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

const updateDueDate = async (req, res) => {
    try {
        let { student_id, semester_id, due_date } = req.body
        await Tuition.update({ due_date }, { where: { student_id, semester_id } })
        return res.status(500).json({
            EC: 0,
            EM: 'Update due date successful',
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

module.exports = { addTuition, removeTuition, getTuition, getTuitionById, payTuition, updateDueDate }
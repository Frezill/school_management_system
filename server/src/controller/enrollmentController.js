const db = require('../models/index.js')

const Enrollment = db.Enrollment
const User = db.User
const Subject = db.Subject
const Semester = db.Semester
const Role = db.Role

const postCreateEnrollment = async (req, res) => {
    try {

        let { user_id, subject_id, semester_id } = req.body
        if (!user_id || !subject_id || !semester_id) {
            return res.status(200).json({
                EC: 3,
                EM: 'Please enter all necessary information',
                DT: ''
            })
        }

        let enrollmentExisted = await Enrollment.findOne({ where: { user_id, subject_id, semester_id } })
        if (enrollmentExisted) {
            return res.status(200).json({
                EC: 1,
                EM: 'You already add this subject to learn list',
                DT: ''
            })
        }

        await Enrollment.create(req.body)
        return res.status(201).json({
            EC: 0,
            EM: 'Create enrollment successful',
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

const putUpdateScore = async (req, res) => {
    try {
        let { user_id, subject_id, semester_id, score } = req.body;
        if (!user_id || !subject_id || !semester_id || !score) {
            return res.status(200).json({
                EC: 3,
                EM: 'Please enter all necessary information',
                DT: ''
            })
        }

        //check student exist
        let studentExisted = await User.findOne({ where: { id: user_id } })
        if (!studentExisted) {
            return res.status(200).json({
                EC: 2,
                EM: 'Not found student',
                DT: ''
            })
        }

        //check subject exist
        let subjectExisted = await Subject.findOne({ where: { id: subject_id } })
        if (!subjectExisted) {
            return res.status(200).json({
                EC: 2,
                EM: 'Not found subject',
                DT: ''
            })
        }

        if (score >= 4) {
            await Enrollment.update({ completed: true }, { where: { user_id, subject_id, semester_id } })
        } else {
            await Enrollment.update({ completed: false }, { where: { user_id, subject_id, semester_id } })
        }

        await Enrollment.update({ score }, { where: { user_id, subject_id, semester_id } })
        return res.status(200).json({
            EC: 0,
            EM: 'Update score successful',
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

const putUpdateAttendance = async (req, res) => {
    try {
        let { day, isAttendance, user_id, subject_id, semester_id } = req.body;

        if (!user_id || !subject_id || !semester_id || !day || !isAttendance) {
            return res.status(200).json({
                EC: 3,
                EM: 'Please enter all necessary information',
                DT: ''
            })
        }

        //check student exist
        let studentExisted = await User.findOne({ where: { id: user_id } })
        if (!studentExisted) {
            return res.status(200).json({
                EC: 2,
                EM: 'Not found student',
                DT: ''
            })
        }

        //check subject exist
        let subjectExisted = await Subject.findOne({ where: { id: subject_id } })
        if (!subjectExisted) {
            return res.status(200).json({
                EC: 2,
                EM: 'Not found subject',
                DT: ''
            })
        }

        let enrollment = await Enrollment.findOne({ where: { user_id, subject_id, semester_id } })

        let lastAttendance = JSON.parse(enrollment?.attendance)
        let newAttendance = { ...lastAttendance };
        newAttendance[day] = isAttendance
        await Enrollment.update({ attendance: JSON.stringify(newAttendance) }, { where: { user_id, subject_id, semester_id } })

        return res.status(200).json({
            EC: 0,
            EM: 'Update attendance successful',
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

const getEnrollment = async (req, res) => {
    try {
        let { subject_id, semester_id } = req.query
        let data = await Enrollment.findAll({
            where: { subject_id, semester_id },
            attributes: ['id', 'score', 'attendance', 'completed'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'last_name', 'first_name', 'email'],
                    include: {
                        model: Role,
                        attributes: ['id', 'name']
                    }
                },
                {
                    model: Subject,
                    attributes: ['name', 'description']
                },
                {
                    model: Semester,
                    attributes: ['semester']
                }
            ]
        })
        return res.status(200).json({
            EC: 0,
            EM: 'Get enrollment successful',
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

const deleteEnrollment = async (req, res) => {
    try {
        let { user_id, subject_id, semester_id } = req.query;
        if (!user_id || !subject_id || !semester_id) {
            return res.status(200).json({
                EC: 3,
                EM: 'Please enter all necessary information',
                DT: ''
            })
        }

        //check student exist
        let studentExisted = await User.findOne({ where: { id: user_id } })
        if (!studentExisted) {
            return res.status(200).json({
                EC: 2,
                EM: 'Not found student',
                DT: ''
            })
        }

        //check subject exist
        let subjectExisted = await Subject.findOne({ where: { id: subject_id } })
        if (!subjectExisted) {
            return res.status(200).json({
                EC: 2,
                EM: 'Not found subject',
                DT: ''
            })
        }

        await Enrollment.destroy({ where: { user_id, subject_id, semester_id } })
        return res.status(200).json({
            EC: 0,
            EM: 'Delete enrollment successful',
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

const getEnrollmentByStudentId = async (req, res) => {
    try {
        let { userId, semesterId } = req.query
        let data = await Enrollment.findAll({
            where: { user_id: userId, semester_id: semesterId },
            attributes: ['id', 'score', 'attendance', 'completed'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'last_name', 'first_name', 'email']
                },
                {
                    model: Subject,
                    attributes: ['id', 'name', 'number_of_credits', 'description', 'tuition']
                },
                {
                    model: Semester,
                    attributes: ['id', 'semester']
                }
            ]
        })
        return res.status(200).json({
            EC: 0,
            EM: 'Get enrollment by user id successful',
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

const getEnrollmentForTeacher = async (req, res) => {
    try {
        let { user_id, semester_id } = req.query
        let data = await Enrollment.findAll({
            where: { user_id, semester_id },
            attributes: ['id'],
            include: [
                {
                    model: Subject,
                    attributes: ['id', 'name']
                }
            ]
        })

        return res.status(200).json({
            EC: 0,
            EM: 'Get subject for teacher successful',
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

const getStudentForTeacher = async (req, res) => {
    try {
        let { subject_id, semester_id } = req.query
        let data = await Enrollment.findAll({
            where: { subject_id, semester_id },
            attributes: ['id', 'score', 'attendance', 'completed'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'last_name', 'first_name', 'email'],
                    include: {
                        model: Role,
                        attributes: ['id', 'name']
                    }
                },
            ]
        })

        return res.status(200).json({
            EC: 0,
            EM: 'Get student for teacher successful',
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

module.exports = {
    postCreateEnrollment, putUpdateScore, putUpdateAttendance,
    getEnrollment, deleteEnrollment, getEnrollmentByStudentId,
    getEnrollmentForTeacher, getStudentForTeacher
}
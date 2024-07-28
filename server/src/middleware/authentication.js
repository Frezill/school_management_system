const jwt = require('jsonwebtoken');
const db = require('../models/index.js')
require('dotenv').config()

const createJWT = (payload) => {
    let token = null;
    try {
        token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: `${process.env.JWT_EXPRIRES_IN}` })
    } catch (error) {
        console.log(error);
    }
    return token;
}

const verifyToken = (token) => {
    try {
        let key = process.env.JWT_SECRET_KEY;
        let decoded = jwt.verify(token, key)
        return decoded;
    } catch (error) {
        console.log(error);
    }
}

const extractToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

const checkUserJWT = (req, res, next) => {
    let cookies = req.cookies;
    let tokenFromHeader = extractToken(req)
    if ((cookies && cookies.token) || tokenFromHeader) {
        let token = cookies.token ? cookies.token : tokenFromHeader
        let decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
            req.token = token;
            next();
        } else {
            return res.status(401).json({
                EC: 4,
                EM: 'Not authenticated the user',
                DT: ''
            })
        }
    } else {
        return res.status(401).json({
            EC: 4,
            EM: 'Not authenticated the user',
            DT: ''
        })
    }
}

const isStudent = (req, res, next) => {
    if (req && req.user && (req.user.role === 'Student')) {
        next()
    } else {
        return res.status(403).json({
            EC: 4,
            EM: `You don't have permission to access this resource!`,
            DT: ''
        })
    }
}

const isTeacher = (req, res, next) => {
    if (req && req.user && (req.user.role === 'Instructor')) {
        next()
    } else {
        return res.status(403).json({
            EC: 4,
            EM: `You don't have permission to access this resource!`,
            DT: ''
        })
    }
}

const isAdmin = (req, res, next) => {
    if (req && req.user && req.user.role === 'Admin') {
        next()
    } else {
        return res.status(403).json({
            EC: 4,
            EM: `You don't have permission to access this resource!`,
            DT: ''
        })
    }
}

const Period = db.Period

const isSubjectRegistrationPeriod = async (req, res, next) => {
    try {
        let registrationPeriod = await Period.findOne({ where: { name: 'subject_registration' } })
        let check = +registrationPeriod.isActive
        if (check) {
            next()
        } else {
            return res.status(404).json({
                EC: 4,
                EM: 'Registration subject service not ready now',
                DT: ''
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: 1,
            EM: 'Error from server',
            DT: ''
        })
    }
}

const isPayTuitionPeriod = async (req, res, next) => {
    try {
        let payTuitionPeriod = await Period.findOne({ where: { name: 'pay_tuition' } })
        if (payTuitionPeriod.isActive) {
            next()
        } else {
            return res.status(404).json({
                EC: 4,
                EM: 'Pay tuition service not ready now',
                DT: ''
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: 1,
            EM: 'Error from server',
            DT: ''
        })
    }
}

const Semester = db.Semester

const isActiveSemester = async (req, res, next) => {
    try {
        if ((req && req.body && req.body.semester_id) || (req && req.query && req.query.semester_id)) {
            let semester_id = req.body.semester_id || req.query.semester_id || req.body.semesterId || req.query.semesterId

            let semester = await Semester.findOne({ where: { id: semester_id } })
            if (!semester.isActive) {
                return res.status(405).json({
                    EC: 4,
                    EM: `Semester ${semester.semester} not ready now`,
                    DT: ''
                })
            } else {
                next()
            }
        } else {
            return res.status(403).json({
                EC: 1,
                EM: 'Not found data',
                DT: ''
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: 1,
            EM: 'Error from server',
            DT: ''
        })
    }
}

module.exports = { createJWT, checkUserJWT, isStudent, isTeacher, isAdmin, isSubjectRegistrationPeriod, isPayTuitionPeriod, isActiveSemester }
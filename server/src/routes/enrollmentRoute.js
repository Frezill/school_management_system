const express = require('express');
const { postCreateEnrollment, putUpdateScore, putUpdateAttendance,
    getEnrollment, deleteEnrollment,
    getEnrollmentByStudentId,
    getEnrollmentForTeacher,
    getStudentForTeacher } = require('../controller/enrollmentController');

const { checkUserJWT, isTeacher, isAdmin, isSubjectRegistrationPeriod, isPayTuitionPeriod } = require('../middleware/authentication.js')

const router = express.Router()

const initEnrollmentRoute = (app) => {

    router.post('/enrollment', checkUserJWT, isSubjectRegistrationPeriod, postCreateEnrollment)
    router.put('/scoreEnrollment', checkUserJWT, isTeacher, putUpdateScore)
    router.put('/attendanceEnrollment', checkUserJWT, isTeacher, putUpdateAttendance)
    router.get('/enrollment', checkUserJWT, getEnrollment)
    router.delete('/enrollment', checkUserJWT, isSubjectRegistrationPeriod, deleteEnrollment)
    router.get('/enrollmentByStudentID', checkUserJWT, getEnrollmentByStudentId)
    router.get('/getEnrollmentForTeacher', checkUserJWT, isTeacher, getEnrollmentForTeacher)
    router.get('/getStudentForTeacher', checkUserJWT, isTeacher, getStudentForTeacher)

    return app.use('/api/v1', router);
}

module.exports = initEnrollmentRoute;
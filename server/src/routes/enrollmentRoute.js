const express = require('express');
const { postCreateEnrollment, putUpdateScore, putUpdateAttendance,
    getEnrollment, deleteEnrollment,
    getEnrollmentByStudentId,
    getEnrollmentForTeacher,
    getStudentForTeacher,
    getTeacherForAssign,
    postCreateAssign } = require('../controller/enrollmentController');

const { checkUserJWT, isStudent, isTeacher, isAdmin, isSubjectRegistrationPeriod, isActiveSemester } = require('../middleware/authentication.js')

const router = express.Router()

const initEnrollmentRoute = (app) => {

    router.post('/enrollment', checkUserJWT, isSubjectRegistrationPeriod, isActiveSemester, postCreateEnrollment)
    router.put('/scoreEnrollment', checkUserJWT, isActiveSemester, isTeacher, putUpdateScore)
    router.put('/attendanceEnrollment', checkUserJWT, isActiveSemester, isTeacher, putUpdateAttendance)
    router.get('/enrollment', checkUserJWT, getEnrollment)
    router.delete('/enrollment', checkUserJWT, isActiveSemester, isSubjectRegistrationPeriod, deleteEnrollment)
    router.get('/enrollmentByStudentID', checkUserJWT, isStudent, getEnrollmentByStudentId)
    router.get('/getEnrollmentForTeacher', checkUserJWT, isTeacher, getEnrollmentForTeacher)
    router.get('/getStudentForTeacher', checkUserJWT, isTeacher, getStudentForTeacher)

    router.get('/assignTeacher', checkUserJWT, isAdmin, getTeacherForAssign)
    router.post('/assignTeacher', checkUserJWT, isActiveSemester, isAdmin, postCreateAssign)

    return app.use('/api/v1', router);
}

module.exports = initEnrollmentRoute;
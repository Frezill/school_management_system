const express = require('express');
const { postCreateEnrollment, putUpdateScore, putUpdateAttendance,
    getEnrollment, deleteEnrollment } = require('../controller/enrollmentController');

const { checkUserJWT, isTeacher, isAdmin, isSubjectRegistrationPeriod, isPayTuitionPeriod } = require('../middleware/authentication.js')

const router = express.Router()

const initEnrollmentRoute = (app) => {

    router.post('/enrollment', checkUserJWT, isSubjectRegistrationPeriod, postCreateEnrollment)
    router.put('/scoreEnrollment', checkUserJWT, isTeacher, putUpdateScore)
    router.put('/attendanceEnrollment', checkUserJWT, isTeacher, putUpdateAttendance)
    router.get('/enrollment', checkUserJWT, isTeacher, getEnrollment)
    router.delete('/enrollment', checkUserJWT, isSubjectRegistrationPeriod, deleteEnrollment)

    return app.use('/api/v1', router);
}

module.exports = initEnrollmentRoute;
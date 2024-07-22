const express = require('express');
const { postCreateEnrollment, putUpdateScore, putUpdateAttendance, getEnrollment, deleteEnrollment } = require('../controller/enrollmentController');

const router = express.Router()

const initEnrollmentRoute = (app) => {

    router.post('/enrollment', postCreateEnrollment)
    router.put('/scoreEnrollment', putUpdateScore)
    router.put('/attendanceEnrollment', putUpdateAttendance)
    router.get('/enrollment', getEnrollment)
    router.delete('/enrollment', deleteEnrollment)

    return app.use('/api/v1', router);
}

module.exports = initEnrollmentRoute;
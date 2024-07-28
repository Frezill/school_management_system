const express = require('express');
const { addTuition, removeTuition, getTuition,
    getTuitionById, payTuition, updateDueDate } = require('../controller/tuitionController');
const { checkUserJWT, isStudent, isTeacher, isAdmin, isSubjectRegistrationPeriod, isActiveSemester, isPayTuitionPeriod } = require('../middleware/authentication.js')

const router = express.Router()

const initTuitionRoute = (app) => {

    router.post('/tuition', checkUserJWT, isStudent, isSubjectRegistrationPeriod, addTuition)
    router.put('/removeTuition', checkUserJWT, isStudent, removeTuition)
    router.get('/tuition', checkUserJWT, getTuition)
    router.get('/detailTuition', checkUserJWT, isStudent, getTuitionById)
    router.put('/payTuition', checkUserJWT, isAdmin, isPayTuitionPeriod, payTuition)
    router.put('/dueDateTuition', checkUserJWT, updateDueDate)

    return app.use('/api/v1', router);
}

module.exports = initTuitionRoute;
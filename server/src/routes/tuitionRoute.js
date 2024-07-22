const express = require('express');
const { addTuition, removeTuition, getTuition,
    getTuitionById, payTuition, updateDueDate } = require('../controller/tuitionController');
const { checkUserJWT, isTeacher, isAdmin, isSubjectRegistrationPeriod, isPayTuitionPeriod } = require('../middleware/authentication.js')

const router = express.Router()

const initTuitionRoute = (app) => {

    router.post('/tuition', checkUserJWT, addTuition)
    router.put('/removeTuition', checkUserJWT, removeTuition)
    router.get('/tuition', checkUserJWT, isTeacher, getTuition)
    router.get('/detailTuition', checkUserJWT, getTuitionById)
    router.put('/payTuition', checkUserJWT, isPayTuitionPeriod, payTuition)
    router.put('/dueDateTuition', checkUserJWT, isAdmin, updateDueDate)

    return app.use('/api/v1', router);
}

module.exports = initTuitionRoute;
const express = require('express');
const { updatePayTuitionActive, updateSubjectRegistrationActive, getPeriod } = require('../controller/periodController');
const { checkUserJWT, isTeacher, isAdmin, isSubjectRegistrationPeriod, isPayTuitionPeriod } = require('../middleware/authentication.js')

const router = express.Router()

const initPeriodRoute = (app) => {

    router.put('/payTuitionPeriod', checkUserJWT, isAdmin, updatePayTuitionActive)
    router.put('/subjectRegistrationPeriod', checkUserJWT, isAdmin, updateSubjectRegistrationActive)
    router.get('/period', checkUserJWT, getPeriod)

    return app.use('/api/v1', router);
}

module.exports = initPeriodRoute;
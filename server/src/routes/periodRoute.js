const express = require('express');
const { updatePayTuitionActive, updateSubjectRegistrationActive, getPeriod } = require('../controller/periodController');


const router = express.Router()

const initPeriodRoute = (app) => {

    router.put('/payTuitionPeriod', updatePayTuitionActive)
    router.put('/subjectRegistrationPeriod', updateSubjectRegistrationActive)
    router.get('/period', getPeriod)

    return app.use('/api/v1', router);
}

module.exports = initPeriodRoute;
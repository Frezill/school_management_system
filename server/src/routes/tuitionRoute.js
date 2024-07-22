const express = require('express');
const { addTuition, removeTuition, getTuition, getTuitionById, payTuition, updateDueDate } = require('../controller/tuitionController');

const router = express.Router()

const initTuitionRoute = (app) => {

    router.post('/tuition', addTuition)
    router.put('/removeTuition', removeTuition)
    router.get('/tuition', getTuition)
    router.get('/detailTuition', getTuitionById)
    router.put('/payTuition', payTuition)
    router.put('/dueDateTuition', updateDueDate)

    return app.use('/api/v1', router);
}

module.exports = initTuitionRoute;
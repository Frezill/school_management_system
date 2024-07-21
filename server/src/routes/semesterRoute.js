const express = require('express');
const { postCreateSemester, getSemester, putUpdateSemester, deleteSemester } = require('../controller/semesterController');


const router = express.Router()

const initSemesterRoute = (app) => {

    router.post('/semester', postCreateSemester)
    router.get('/semester', getSemester)
    router.put('/semester', putUpdateSemester)
    router.delete('/semester', deleteSemester)

    return app.use('/api/v1', router);
}

module.exports = initSemesterRoute;
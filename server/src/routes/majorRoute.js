const express = require('express');
const { postCreateMajor, getMajor, putUpdateMajor } = require('../controller/majorController');

const router = express.Router()

const initMajorRoute = (app) => {

    router.post('/major', postCreateMajor)
    router.get('/major', getMajor)
    router.put('/major', putUpdateMajor)

    return app.use('/api/v1', router);
}

module.exports = initMajorRoute;
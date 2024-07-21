const express = require('express')
const { postCreateSubject, getSubject, putUpdateSubject, deleteSubject, getSubjectById } = require('../controller/subjectController.js')

const router = express.Router()

const initSubjectRoute = (app) => {

    router.post('/subject', postCreateSubject)
    router.get('/subject', getSubject)
    router.get('/detailSubject', getSubjectById)
    router.put('/subject', putUpdateSubject)
    router.delete('/subject', deleteSubject)


    return app.use('/api/v1', router);
}

module.exports = initSubjectRoute;
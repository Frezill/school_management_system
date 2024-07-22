const express = require('express');
const { postCreateRole, getRole, putUpdateRole, getRoleById, deleteRole } = require('../controller/roleController');
const { checkUserJWT, isTeacher, isAdmin, isSubjectRegistrationPeriod, isPayTuitionPeriod } = require('../middleware/authentication.js')

const router = express.Router()

const initRoleRoute = (app) => {

    router.post('/role', checkUserJWT, isAdmin, postCreateRole)
    router.get('/role', checkUserJWT, getRole)
    router.get('/detailRole', checkUserJWT, getRoleById)
    router.put('/role', checkUserJWT, isAdmin, putUpdateRole)
    router.delete('/role', checkUserJWT, isAdmin, deleteRole)

    return app.use('/api/v1', router);
}

module.exports = initRoleRoute;
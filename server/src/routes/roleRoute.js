const express = require('express');
const { postCreateRole, getRole, putUpdateRole, getRoleById, deleteRole } = require('../controller/roleController');


const router = express.Router()

const initRoleRoute = (app) => {

    router.post('/role', postCreateRole)
    router.get('/role', getRole)
    router.get('/detailRole', getRoleById)
    router.put('/role', putUpdateRole)
    router.delete('/role', deleteRole)

    return app.use('/api/v1', router);
}

module.exports = initRoleRoute;
import express from 'express'
const router = express.Router()

const initUserRoutes = (app) => {


    return app.use('/api/v1', router);
}

export default initUserRoutes;
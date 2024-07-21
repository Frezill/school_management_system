const db = require('../models/index.js')

const Major = db.Major

const postCreateMajor = async (req, res) => {
    try {
        let { name, year } = req.body
        if (!name || !year) {
            return res.status(200).json({
                EC: 1,
                EM: 'Please enter all necessary information',
                DT: ''
            })
        }
        await Major.create(req.body)
        return res.status(201).json({
            EC: 0,
            EM: 'Create major successful',
            DT: ''
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: 1,
            EM: 'Error in server',
            DT: ''
        })
    }
}

const getMajor = async (req, res) => {
    try {
        let response = await Major.findAll({ attributes: ['id', 'name', 'year'] });
        return res.status(201).json({
            EC: 0,
            EM: 'Get major successful',
            DT: response
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: 1,
            EM: 'Error in server',
            DT: ''
        })
    }
}

const putUpdateMajor = async (req, res) => {
    try {
        let { id, name, year } = req.body
        console.log(req.body);
        if (!id) {
            return res.status(200).json({
                EC: 1,
                EM: 'Please enter id of major to update',
                DT: ''
            })
        }

        let majorExist = await Major.findOne({ where: { id } })
        if (!majorExist) {
            return res.status(200).json({
                EC: 2,
                EM: 'No majors found that need updating',
                DT: ''
            })
        }
        await Major.update({ name, year }, { where: { id } })
        return res.status(200).json({
            EC: 0,
            EM: 'Update major successful',
            DT: ''
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: 1,
            EM: 'Error in server',
            DT: ''
        })
    }
}

const deleteMajor = async (req, res) => {
    try {
        let { id } = req.query
        if (!id) {
            return res.status(200).json({
                EC: 1,
                EM: 'Please enter id of major to delete',
                DT: ''
            })
        }

        let subject = await Major.findOne({ where: { id } })
        if (!subject) {
            return res.status(200).json({
                EC: 2,
                EM: 'No majors found that need updating',
                DT: ''
            })
        }

        await Major.destroy({ where: { id } })
        return res.status(200).json({
            EC: 0,
            EM: 'Delete major successful',
            DT: ''
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: 1,
            EM: 'Error in server',
            DT: ''
        })
    }
}

module.exports = { postCreateMajor, getMajor, putUpdateMajor, deleteMajor }
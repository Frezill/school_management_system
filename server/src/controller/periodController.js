const db = require('../models/index.js')

const Period = db.Period;

const updatePayTuitionActive = async (req, res) => {
    try {
        let statusOfPayTuition = await Period.findOne({ where: { name: 'pay_tuition' } })
        let newActive = true;
        if (+statusOfPayTuition.isActive) {
            newActive = false
        } else {
            newActive = true
        }
        await Period.update({ isActive: newActive }, { where: { name: 'pay_tuition' } })
        return res.status(200).json({
            EC: 0,
            EM: 'Update pay tuition period successful',
            DT: ""
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

const updateSubjectRegistrationActive = async (req, res) => {
    try {
        let statusOfSubjectRegistration = await Period.findOne({ where: { name: 'subject_registration' } })
        let newActive = true;
        if (+statusOfSubjectRegistration.isActive) {
            newActive = false
        } else {
            newActive = true
        }
        await Period.update({ isActive: newActive }, { where: { name: 'subject_registration' } })
        return res.status(200).json({
            EC: 0,
            EM: 'Update subject registration period successful',
            DT: ""
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

const getPeriod = async (req, res) => {
    try {
        let data = await Period.findAll()
        return res.status(200).json({
            EC: 0,
            EM: 'Get period successful',
            DT: data
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

module.exports = { updatePayTuitionActive, updateSubjectRegistrationActive, getPeriod }
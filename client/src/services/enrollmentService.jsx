import { toast } from 'react-toastify';
import axios from '../setup/axios.jsx'

const createEnrollmentService = async (user_id, semester_id, subject_id) => {
    try {
        let response = await axios.post('/enrollment', { user_id, semester_id, subject_id })
        if (response.EC === 0) {
            toast.success(response.EM)
        } else {
            toast.error(response.EM)
        }
    } catch (error) {
        console.log(error);
    }
}

const getEnrollmentForStudentService = async (userId, semesterId) => {
    try {
        let response = await axios.get(`/enrollmentByStudentID?userId=${userId}&semesterId=${semesterId}`)
        let data = [];
        response.DT.map((item, index) => {
            let semester = item.Semester.semester;
            let semesterId = item.Semester.id;
            let subjectId = item.Subject.id
            let subjectName = item.Subject.name
            let subjectDescription = item.Subject.description
            let subjectCredits = item.Subject.number_of_credits
            let score = item.score
            let completed = item.completed
            let enrollmentId = item.id

            let attendance = JSON.parse(item.attendance)
            if (attendance) {
                let entriesArray = Object.entries(attendance);
                attendance = entriesArray
            }

            data.push({ semester, semesterId, subjectId, subjectName, subjectDescription, subjectCredits, score, attendance, completed, enrollmentId })
        })

        return data

    } catch (error) {
        console.log(error);
    }
}

const getTeacherForStudentManageService = async (subject_id, semester_id) => {
    try {
        let response = await axios.get(`enrollment?subject_id=${subject_id}&semester_id=${semester_id}`)
        let name = ''

        response.DT.map((item, index) => {
            if (item.User.Role.name === 'Instructor') {
                name = item.User.first_name + ' ' + item.User.last_name;
            }
        })

        return name;
    } catch (error) {
        console.log(); (error)
    }
}

export { createEnrollmentService, getEnrollmentForStudentService, getTeacherForStudentManageService }
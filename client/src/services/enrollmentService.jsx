import { toast } from 'react-toastify';
import axios from '../setup/axios.jsx'

const createEnrollmentService = async (user_id, semester_id, subject_id) => {
    try {
        let response = await axios.post('/enrollment', { user_id, semester_id, subject_id })
        let student_id = user_id;
        await axios.post('/tuition', { student_id, semester_id, subject_id })
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
            let subjectTuition = item.Subject.tuition
            let score = item.score
            let completed = item.completed
            let enrollmentId = item.id

            let attendance = JSON.parse(item.attendance)
            if (attendance) {
                let entriesArray = Object.entries(attendance);
                attendance = entriesArray
            }

            data.push({ semester, semesterId, subjectId, subjectName, subjectDescription, subjectCredits, subjectTuition, score, attendance, completed, enrollmentId })
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

const getSubjectForTeacherService = async (user_id, semester_id) => {
    try {
        let response = await axios.get(`/getEnrollmentForTeacher?user_id=${user_id}&semester_id=${semester_id}`)
        let data = []
        response.DT.map((item, index) => {
            data.push(item.Subject)
        })
        return data
    } catch (error) {
        console.log(error);
    }
}

const getStudentForTeacherService = async (subject_id, semester_id) => {
    try {
        let response = await axios.get(`getStudentForTeacher?subject_id=${subject_id}&semester_id=${semester_id}`)
        let data = []

        response.DT.map((item, index) => {
            let studentEmail = item.User.email
            let studentFirst_name = item.User.first_name
            let studentLast_name = item.User.last_name
            let studentId = item.User.id
            let completed = item.completed
            let id = item.id
            let score = item.score
            let role = item.User.Role.name

            let attendance = JSON.parse(item.attendance)
            if (attendance) {
                let entriesArray = Object.entries(attendance);
                attendance = entriesArray
            }

            data.push({ studentEmail, studentFirst_name, studentLast_name, studentId, attendance, completed, id, score, role })
        })
        let newData = data.filter((item) => item.role !== 'Instructor')

        return newData;

    } catch (error) {
        console.log(error);
    }
}

const giveScoreService = async (user_id, subject_id, semester_id, score) => {
    try {
        let response = await axios.put('/scoreEnrollment', { user_id, subject_id, semester_id, score })
        if (response.EC === 0) {
            toast.success(response.EM)
        } else {
            toast.error(response.EM)
        }
    } catch (error) {
        console.log(error);
    }
}

const updateAttendanceEnrollmentService = async (user_id, subject_id, semester_id, day, isAttendance) => {
    try {
        let response = await axios.put('/attendanceEnrollment', { user_id, subject_id, semester_id, day, isAttendance })
        if (response.EC === 0) {
            toast.success(response.EM)
        } else {
            toast.error(response.EM)
        }
    } catch (error) {
        console.log(error);
    }
}

export {
    createEnrollmentService, getEnrollmentForStudentService, getTeacherForStudentManageService,
    getSubjectForTeacherService, getStudentForTeacherService, giveScoreService,
    updateAttendanceEnrollmentService
}
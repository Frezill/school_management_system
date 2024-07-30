School Management System

Overview
  This project is a full-stack school management system built with React for the frontend, Node.js for the backend, and MySQL database managed by Sequelize ORM. It caters to three primary user roles: students, teachers, and administrators, each with specific functionalities.

Features
    - Student
        + Registration: Students can register for new subjects.
        + Class Management: View and manage their enrolled classes (check scores, attendance, and completion status for each subject).
        + Tuition: View tuition details.
    
    - Teacher
        + Manage assigned classes.
        + Input student scores and attendance.
    
    - Admin
        + User Management: Create, edit, and delete user accounts for students, teachers, and administrators.
        + Class Management: Assign teachers to classes.
        + Financial Management: Manage tuition fees, including payments and controls.
        + Academic Management: Manage subjects, majors, semesters, and registration periods.
        + System Control: Determine the active semester.

Technology Stack
Frontend: React.js, Redux Toolkit
Backend: Node.js, Express.js
Database: MySQL
ORM: Sequelize
Authentication: Bcrypt, JWT

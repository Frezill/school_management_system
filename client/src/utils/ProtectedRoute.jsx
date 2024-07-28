import React from 'react'
import { useSelector } from "react-redux";
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({
    type,
    redirectPath = '/',
    children,
}) => {
    const user = useSelector((state) => state.user);
    if (!user) {
        return <Navigate to='/login' replace />
    }

    switch (type) {
        case 'Student':
            if (user.role !== 'Student') {
                return <Navigate to={redirectPath} replace />
            }
            break;

        case 'Teacher':
            if (user.role !== 'Instructor') {
                return <Navigate to={redirectPath} replace />
            }
            break;

        case 'Admin':
            if (user.role !== 'Admin') {
                return <Navigate to={redirectPath} replace />
            }
            break;

        default:
            break;
    }

    return children ? children : <Outlet />
}

export default ProtectedRoute
import { Route, Routes } from 'react-router-dom'
import './styles/App.scss'
import { ToastContainer } from 'react-toastify';

import Navbar from "./components/Navbar"
import Homepage from './pages/Homepage'
import Footer from './components/Footer'
import Learning from './pages/Learning'
import Introduction from './pages/Introduction'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile';
import StudentManage from './pages/StudentManage';
import Tuition from './pages/Tuition';
import Teaching from './pages/Teaching';
import ManageAccount from './pages/ManageAccount';
import ManageTuition from './pages/ManageTuition';
import ManageOverall from './pages/ManageOverall';
import ProtectedRoute from './utils/ProtectedRoute';

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/introduction' element={<Introduction />} />
        <Route path='/login' element={<Login />} />

        <Route element={<ProtectedRoute type='Student' />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/learning' element={<Learning />} />
          <Route path='/studentManage' element={<StudentManage />} />
          <Route path='/tuition' element={<Tuition />} />
        </Route>

        <Route element={<ProtectedRoute type='Teacher' />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/teaching' element={<Teaching />} />
        </Route>

        <Route element={<ProtectedRoute type='Admin' />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/manageAccount' element={<ManageAccount />}></Route>
          <Route path='/manageTuition' element={<ManageTuition />} />
          <Route path='/manageOverall' element={<ManageOverall />}></Route>
          <Route path='/register' element={<Register />} />
        </Route>

        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>

  )
}

export default App

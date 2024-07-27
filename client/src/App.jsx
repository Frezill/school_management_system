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

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/learning' element={<Learning />} />
        <Route path='/introduction' element={<Introduction />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/studentManage' element={<StudentManage />} />
        <Route path='/tuition' element={<Tuition />} />
        <Route path='/teaching' element={<Teaching />} />
        <Route path='/manageAccount' element={<ManageAccount />}></Route>
        <Route path='/manageTuition' element={<ManageTuition />} />
        <Route path='/manageOverall' element={<ManageOverall />}></Route>
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

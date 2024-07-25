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

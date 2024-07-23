import { Route, Routes } from 'react-router-dom'
import './styles/App.scss'

import Navbar from "./components/Navbar"
import Homepage from './pages/Homepage'
import Footer from './components/Footer'
import Learning from './pages/Learning'
import Introduction from './pages/Introduction'
import News from './pages/News'

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/learning' element={<Learning />} />
        <Route path='/introduction' element={<Introduction />} />
        <Route path='/news' element={<News />} />
      </Routes>
      <Footer />
    </div>

  )
}

export default App

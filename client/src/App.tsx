
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/landingPage'
import { ChatPage } from './pages/chatPage'
import Login from './pages/login'
import SignUp from './pages/signup'
import Layout from './components/layout'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import { ToastContainer } from 'react-toastify';
function App() {

  return (
   <>
      <Routes>
        <Route  element={<Layout/>} >
            <Route path='/' element={<LandingPage/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/*' element={<NotFound />} />
        </Route>
          {/* <ProtectedRoute>
            <Route path='/chat' element={<ChatPage/>} />
           </ProtectedRoute> */}

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />   

        <Route
          path="/chat/:sessionId"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />   
        </Routes>
        <ToastContainer/>
   </>
  )
}

export default App

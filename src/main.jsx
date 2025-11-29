import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Routes , Route , BrowserRouter } from "react-router-dom"
import View from './View.jsx'
import { Signup  } from './SignUp.jsx'
import { Login } from './Login.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path='/viewPassword' element={<View />} />
    <Route path='/' element={<App />} />
    <Route path='/signup' element={<Signup/>} />
    <Route path='/login' element={<Login/>} />
  </Routes>
    
  </BrowserRouter>
  
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import Register from './components/Register.jsx'
import Home from './pages/Home.jsx'
import Login from './components/Login.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    {/* <Home /> */}
    {/* <Login /> */}
    {/* <Register /> */}
    <App />
  </StrictMode>,
)

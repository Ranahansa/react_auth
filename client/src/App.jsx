import React from 'react'
import Login from './components/Login'
import Navigation from './components/Navigation'
import Home from './components/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import Premium from './components/Premium';

const App = () => {
  return (

    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/premium" element={<Premium />} />
        </Routes>
      </div>
      </Router>
  )
}

export default App

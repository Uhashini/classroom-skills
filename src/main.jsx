import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import FamilyFeedback from './FamilyFeedback.jsx'

function AppRouter() {
  return (
    <BrowserRouter>
      <nav style={{
        padding: '16px',
        background: '#f8fafc',
        borderBottom: '2px solid #e2e8f0',
        display: 'flex',
        gap: '16px',
        justifyContent: 'center'
      }}>
        <Link to="/" style={{
          padding: '8px 16px',
          background: '#3b82f6',
          color: 'white',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '500'
        }}>
          Classroom Skills
        </Link>
        <Link to="/feedback" style={{
          padding: '8px 16px',
          background: '#10b981',
          color: 'white',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '500'
        }}>
          Family Feedback
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/feedback" element={<FamilyFeedback />} />
      </Routes>
    </BrowserRouter>
  )
}

const rootEl = document.getElementById('root')
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <AppRouter />
    </StrictMode>
  )
}

import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'
import Navbar from './layouts/navbar.tsx'
import HRPage from './pages/hr/employee/index.tsx'
import Sidebar from './layouts/sidebar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<App />} />
        </Route>
        <Route path="/hr" element={<Sidebar />}>
          <Route index element={<HRPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import DashboardPage from './dashboard/dashboard.page'

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  )
}

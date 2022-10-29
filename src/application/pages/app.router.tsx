import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { AnalysisPage } from './analysis/analysis.page'
import DashboardPage from './dashboard/dashboard.page'

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
      </Routes>
    </Router>
  )
}

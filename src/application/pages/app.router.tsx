import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { AnalysisPage } from './analysis/analysis.page'
import DashboardPage from './dashboard/dashboard.page'
import { HomePage } from './home/home.page'

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

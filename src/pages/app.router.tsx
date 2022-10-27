import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import DashboardPage from "./dashboard.page"

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  )
}

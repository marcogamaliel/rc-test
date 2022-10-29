import React from 'react'
import { Link } from 'react-router-dom'
import './home.page.scss'

export function HomePage() {
  return (
    <section className="home-page">
      <h1>Racional</h1>
      <div className="home-page__menu">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/analysis">Analysis</Link>
      </div>
    </section>
  )
}

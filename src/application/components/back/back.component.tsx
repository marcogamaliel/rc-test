import './back.component.scss'
import { Link } from "react-router-dom"

export function Back() {
  return (
    <Link to="/" className="back">
      <span className="material-symbols-outlined back">arrow_back_ios</span>
    </Link>
  )
}
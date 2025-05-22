import { Link } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          POD-Tees
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/product" className="navbar-link">
            Design
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

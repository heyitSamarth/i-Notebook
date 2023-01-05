import React from 'react'
import {Link ,useNavigate,useLocation} from "react-router-dom"

function Navbar() {
    let l=useNavigate();
    const handleclick=()=>{
      localStorage.removeItem('token');
      l("/login")
    }
  return (
    <nav className="navbar  navbar-expand-lg navbar-dark navbar-fixed-top bg-dark">
    <div className="container-fluid">
      <div className="navbar-brand" >iNotebook</div>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link mx-1 ${useLocation.pathname==="/"? "active":"" }`} aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link mx-1 ${useLocation.pathname==="/about"? "active":"" }`} to="/about">About </Link>
          </li>
          {/* <li className="nav-item dropdown">
            <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </Link>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="#">Action</Link></li>
              <li><Link className="dropdown-item" to="#">Another action</Link></li>
              <li><hr className="dropdown-divider"/></li>
              <li><Link className="dropdown-item" to="#">Something else here</Link></li>
            </ul>
          </li> */}
          {/* <li className="nav-item">
            <Link className="nav-link disabled">Disabled</Link>
          </li> */}
        </ul>
        {!localStorage.getItem('token') ? <form className="d-flex " role="search">
          <Link className="btn btn-light mx-1" 
          to="/login"
          role="button">Login</Link>
          <Link className="btn btn-light mx-1" 
          to="/signup"
          role="button">Signup</Link>

        </form> : <Link className="btn btn-light mx-1" 
          to="/login" onClick={handleclick} role="button">Sigout</Link> }
      </div>
    </div>
  </nav>
  )
}

export default Navbar
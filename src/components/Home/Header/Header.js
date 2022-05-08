import React from 'react'
import { NavLink } from 'react-router-dom'
export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Navbar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink activeStyle={{ color: 'red', fontWeight: 'bold' }} className="nav-link active" aria-current="page" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeStyle={{ color: 'red', fontWeight: 'bold' }} className="nav-link " aria-current="page" to="/contact">Contact</NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeStyle={{ color: 'red', fontWeight: 'bold' }} className="nav-link " aria-current="page" to="/login">Login</NavLink>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><NavLink to='/todolist' class="dropdown-item">ToDoList</NavLink></li>
                <li><NavLink to='/todolist2' class="dropdown-item" >todolistRFC</NavLink></li>
                <li><NavLink to='/todolistredux' class="dropdown-item" >todolistRedux</NavLink></li>
                <li><NavLink to='/todolistsaga' class="dropdown-item" >todolistSaga</NavLink></li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink activeStyle={{ color: 'red', fontWeight: 'bold' }} className="nav-link " aria-current="page" to="/demohocmodal">Demo HOC MOdal</NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeStyle={{ color: 'red', fontWeight: 'bold' }} className="nav-link " aria-current="page" to="/drag">Demo Drag drop</NavLink>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  )
}

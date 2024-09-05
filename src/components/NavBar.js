import React from 'react'
import Logo from '../assets/icon.png'
import { Link } from 'react-router-dom'
import '../styles/NavBar.css'

function NavBar() {
  return (
    <div className="navbar">
      <div className="leftBar">
        <img src={Logo}/>
      </div>
      <div className="rightBar">
        <Link to="/"> Home </Link>
        <Link to="/listings"> Listings </Link>
        <Link to="/contact"> Contact </Link>
        <Link to="/account"> Account </Link>
      </div>
        
    </div>
  )
}

export default NavBar
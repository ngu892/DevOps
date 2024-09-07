import React from 'react'
import '../styles/Home.css'
import { Link } from 'react-router-dom';
import PropertyMaintenanceButtons from '../components/PropertyMaintenanceButtons'; 

function Home() {
  return (
    <div className="home">
      <div className="headerContainer">
        <h1>THIS IS THE HOMEPAGE</h1>
      </div>
      <PropertyMaintenanceButtons />
    </div>
  )
}

export default Home

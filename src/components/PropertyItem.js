import React from 'react'
import { useNavigate } from 'react-router-dom'

function PropertyItem({ image, address, bedrooms, bathrooms, garage, price }) {
  
  const navigate = useNavigate()
  
  const enquiryBtnClick = () => {
    navigate('/enquiry')
  }

  return (
    <div className="propertyItem">
        <div className="propertyImage" style={{ backgroundImage: `url(${image})` }}></div>
        <div className="propertyDetails">
          <h3> {`$${price.toLocaleString()}`} </h3>
          <p> {address} </p>
          <p>Bedroom(s): {bedrooms}</p>
          <p>Bathroom(s): {bathrooms}</p>
          <p>Garage(s): {garage}</p>
          <button className="enquireBtn" onClick={enquiryBtnClick}>Enquire Now!</button>
        </div>
    </div>
  )
}

export default PropertyItem
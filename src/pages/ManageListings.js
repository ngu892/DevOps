import React, { useState } from 'react'
import { PropertyList } from '../assets/PropertyList'
import PropertyItem from '../components/PropertyItem'
import AddPropertyForm from '../components/AddPropertyForm'
import '../styles/ManageListings.css'

function ManageListings() {

  const [toggleState, setToggleState] = useState(1)
  const [properties, setProperties] = useState(PropertyList)
  const [showForm, setShowForm] = useState(false)

  const toggleTab = (index) => {
    setToggleState(index)
  }

  const activeProperties = properties.filter(item => item.isActive)
  const pastProperties = properties.filter(item => !item.isActive)

  const handleAddProperty = (newProperty) => {
    const propertyWithId = {
      ...newProperty,
      id: properties.length + 1, //assign id
      isActive: true,
    }
    setProperties([...properties, propertyWithId])
    setShowForm(false) //close form after submit
  }

  return (
    <div className="manageListings">
      <h1 className="listingsTitle">My Properties</h1>

      <button className="addPropertyBtn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "List Property"}
      </button>
      {showForm && <AddPropertyForm onAddProperty={handleAddProperty}/>}

      <div className="container">

        <div className="tabContainer">
          <div className={toggleState === 1 ? "tabs activeTab" : "tabs"} 
            onClick={() => toggleTab(1)}>Active Listings</div>
          <div className={toggleState === 2 ? "tabs activeTab" : "tabs"} 
            onClick={() => toggleTab(2)}>Past Listings</div>
        </div>

        <div className="contentTabs">
          <div className={toggleState === 1 ? "content activeContent" : "content"}>
            {activeProperties.length === 0 ? (
              <div className="noProperties">No Properties Found.</div>
            ) : (
              activeProperties.map((propertyItem, key) => (
                <PropertyItem 
                  image={propertyItem.image} 
                  address={propertyItem.address} 
                  bedrooms={propertyItem.bedrooms} 
                  bathrooms={propertyItem.bathrooms} 
                  garage={propertyItem.garage} 
                  price={propertyItem.price}/>
              ))
            )}
          </div>
          <div className={toggleState === 2 ? "content activeContent" : "content"}>
            {pastProperties.length === 0 ? (
              <div className="noProperties">No Properties Found.</div>
            ) : (
              pastProperties.map((propertyItem, key) => (
                <PropertyItem 
                  image={propertyItem.image} 
                  address={propertyItem.address} 
                  bedrooms={propertyItem.bedrooms} 
                  bathrooms={propertyItem.bathrooms} 
                  garage={propertyItem.garage} 
                  price={propertyItem.price}/>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  )
}

export default ManageListings
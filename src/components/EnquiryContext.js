import React, { createContext, useState, useContext } from 'react'

const EnquiryContext = createContext();

export const EnquiryProvider = ({ children }) => {
  const [enquiries, setEnquiries] = useState([])
  
  const addEnquiry = (enquiry) => {
    setEnquiries((prevEnquiries) => [
      ...prevEnquiries, 
      {...enquiry, isRead: false}
    ])
  }

  return (
    <EnquiryContext.Provider value={{ enquiries, addEnquiry }}>
      {children}
    </EnquiryContext.Provider>
  )
}

export const useEnquiry = () => {
  return useContext(EnquiryContext)
}
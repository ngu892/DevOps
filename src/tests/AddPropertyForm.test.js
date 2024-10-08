import { render, screen } from '@testing-library/react'
import AddPropertyForm from '../components/AddPropertyForm'
import { act } from 'react'

test('renders AddPropertyForm with all input fields', () => {
  act(() => {
    render(<AddPropertyForm onAddProperty={() => {}} />)
  })

  //check if the inputs are rendered
  expect(screen.getByPlaceholderText('Address')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Bedrooms')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Bathrooms')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Garage')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Price')).toBeInTheDocument()
})
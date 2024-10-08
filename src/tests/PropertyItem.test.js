import { render, screen, fireEvent } from '@testing-library/react'
import PropertyItem from '../components/PropertyItem'
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react'
import React from 'react'

test('clicking Delete button calls deleteClick function', () => {
  const deleteClick = jest.fn()

  act(() => {
    render(
      <MemoryRouter>
        <PropertyItem
          image="test-image.jpg"
          address="Test Address"
          bedrooms={2}
          bathrooms={1}
          garage={1}
          price={100000}
          showEditDeleteBtns={true} //ensure delete button is shown
          deleteClick={deleteClick}
        />
      </MemoryRouter>
    )
  })

  //find the delete button and click it
  const deleteButton = screen.getByText(/delete/i)
  fireEvent.click(deleteButton)

  //deleteClick function was called once
  expect(deleteClick).toHaveBeenCalledTimes(1)
})
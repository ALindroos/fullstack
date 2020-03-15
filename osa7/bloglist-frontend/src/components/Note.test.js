import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog'

const testblog = {
  id: '5a422bc61b54a676234d17fd',
  title: 'SeaBed - A Diary Entry',
  author: 'Kastel',
  url: 'https://tanoshimi.xyz/2016/04/16/ever17-review/',
  likes: 7,
  user: '5a422id61b54a656234d77fg'
}

const testUser = {
  id: '5a422id61b54a656234d77fg',
  username: 'Testman',
  name: "T. Elliot"
}

test('renders title & author by default', () => {
  const component = render(
    <Blog blog={testblog} />
  )

  expect(component.container).toHaveTextContent(
    'SeaBed - A Diary Entry'
  )
  expect(component.container).toHaveTextContent(
    'Kastel'
  )
})

test('does not show additional info by default', () => {
  const component = render(
    <Blog blog={testblog} />
  )
  const div = component.container.querySelector('.blogInfo')
  expect(div).toHaveStyle('display: none')
})

test('show additional info after button press', () => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={testblog} 
      toggleVisibility={mockHandler}
      user={testUser} 
    />
  )

  const button = component.getByText('show')
  fireEvent.click(button)

  const div = component.container.querySelector('.blogInfo')
  expect(div).not.toHaveStyle('display: none')
  expect(component.container).toHaveTextContent(
    'https://tanoshimi.xyz/2016/04/16/ever17-review/'
  )
})

test('pressing like button twice calls the associated function twice', () => {
  const updateBlog = jest.fn()

  const component = render(
    <Blog blog={testblog}
      updateBlog={updateBlog}
      user={testUser} 
    /> 
  )
  
  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  
  expect(updateBlog.mock.calls.length).toBe(2)
})


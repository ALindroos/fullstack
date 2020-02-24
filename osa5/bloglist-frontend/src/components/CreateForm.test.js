import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog'
import CreateForm from './CreateForm'


const testUser = {
  id: '5a422id61b54a656234d77fg',
  username: 'Testman',
  name: "T. Elliot"
}

test("creating blogs call function with correct values", () => {
  const createBlog = jest.fn()

  const component = render(
    <CreateForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'SeaBed - A Diary Entry' }
  })
  fireEvent.change(author, {
    target: { value: 'Kastel' }
  })
  fireEvent.change(url, {
    target: { value: 'https://tanoshimi.xyz/2016/04/16/ever17-review/' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls.length).toBe(1)
  expect(createBlog.mock.calls[0][0].title).toBe('SeaBed - A Diary Entry')
  expect(createBlog.mock.calls[0][0].author).toBe('Kastel')
  expect(createBlog.mock.calls[0][0].url).toBe('https://tanoshimi.xyz/2016/04/16/ever17-review/')
})
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const blogDummy = require('../utils/dummy_blogs')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  blogDummy.allBlogs.map(async (blog) => {
    const blogObject = new Blog(blog)
    await blogObject.save()
  })
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(blogDummy.allBlogs.length)
})

test('a specific author is within returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.author)

  expect(contents).toContain(
    'Michael Chan'
  )
})


afterAll(() => {
  mongoose.connection.close()
})
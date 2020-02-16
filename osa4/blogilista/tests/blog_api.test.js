const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const blogDummy = require('../utils/dummy_blogs')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogDummy.allBlogs)
})

describe('Getting all blogs', () => {
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
    expect(contents).toContain('Michael Chan')
  })
  test('blogs id field is named: id', async () => {
    const response = await api.get('/api/blogs')
    const content = response.body[0]
    expect(content.id).toBeDefined()
  })

})

describe('Adding new blogs', () => {
  test('blog can be added', async () => {
    const newBlog = blogDummy.singleBlog[0]
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const content = response.body.map(r => r.title)
    expect(response.body.length).toBe(blogDummy.allBlogs.length + 1)
    expect(content).toContain('SeaBed - A Diary Entry')
  })
  test('new blog without given likes defaults to zero likes', async () => {
    const newBlog = blogDummy.noLikesBlog
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const content = response.body.filter(r => r.title === 'No likes')
    expect(response.body.length).toBe(blogDummy.allBlogs.length + 1)
    expect(content[0].likes).toBe(0)
  })
  test('new blog without given url fails and doesnt get added', async () => {
    const newBlog = blogDummy.noUrlBlog
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(blogDummy.allBlogs.length)
  })
  test('new blog without title fails and doesnt get added', async () => {
    const newBlog = blogDummy.noTitleBlog
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(blogDummy.allBlogs.length)
  })
})


afterAll(() => {
  mongoose.connection.close()
})
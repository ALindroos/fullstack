const listHelper = require('../utils/list_helper')
const blogDummy = require('../tests/dummy_blogs')


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  }),
  test('list of one blog gives blogs likes', () => {
    expect(listHelper.totalLikes(blogDummy.singleBlog)).toBe(7)
  }),
  test('list of all blogs gives all likes', () => {
    expect(listHelper.totalLikes(blogDummy.allBlogs)).toBe(36)
  })
})
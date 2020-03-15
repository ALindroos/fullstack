const listHelper = require('../utils/list_helper')
const blogDummy = require('../utils/dummy_blogs')


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

describe('favorite blog', () => {
  test('first blog with most likes is given', () => {
    expect(listHelper.favoriteBlog(blogDummy.allBlogs)).toEqual(blogDummy.mostLikedBlog)
  }),
  test('received blog has correct number of likes', () => {
    expect(listHelper.favoriteBlog(blogDummy.allBlogs).likes).toBe(12)
  }),
  test('empty list returns nothing (empty Object)', () => {
    expect(listHelper.favoriteBlog([])).toEqual({})
  })
})
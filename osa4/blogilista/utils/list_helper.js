const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (likes, blog) => {
    return (likes + blog.likes)
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((liked, blog) => {
    return blog.likes > liked.likes || liked.likes === undefined
      ? blog
      : liked
  }, {})
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
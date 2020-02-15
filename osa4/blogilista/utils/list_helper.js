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



module.exports = {
  dummy,
  totalLikes
}
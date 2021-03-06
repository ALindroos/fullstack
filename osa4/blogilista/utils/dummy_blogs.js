
// returns a list of dummy blog objects
const allBlogs = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
  {
    id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
  },
  {
    id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
  },
  {
    id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
]

// returns *a list* containing one blog object
const singleBlog = [
  {
    id: '5a422bc61b54a676234d17fd',
    title: 'SeaBed - A Diary Entry',
    author: 'Kastel',
    url: 'https://tanoshimi.xyz/2016/04/16/ever17-review/',
    likes: 7
  }
]

// returns blog object with most likes
const mostLikedBlog = {
  id: '5a422b3a1b54a676234d17f9',
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 12
}

//returns blog with no likes
const noLikesBlog = {
  title: 'No likes',
  author: 'sad boy',
  url: 'doesnt matter'
}

//no url
const noUrlBlog = {
  title: 'no Url',
  author: 'luddite',
  likes: 9000
}

const noTitleBlog = {
  author: 'procrastinator',
  url: 'ToDo',
  likes: 3
}


module.exports = {
  singleBlog,
  allBlogs,
  mostLikedBlog,
  noLikesBlog,
  noUrlBlog,
  noTitleBlog
}
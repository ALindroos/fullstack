const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  const salt = bcryptjs.genSaltSync(10)
  const passwordHash = await bcryptjs.hash(body.password, salt)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash,
  })
  try {
    const savedUser = await user.save()
    response.json(savedUser)
  } catch (execption) {
    next(execption)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs',
      { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter
const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@fullstack-opdpp.mongodb.net/phonebook?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number
})
const Person = mongoose.model('Person', personSchema)

if ( process.argv.length === 5 ) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(response => {
    console.log(`added ${response.name} ${response.number} added to phonebook`)
    mongoose.connection.close()
  })
}

if ( process.argv.length === 3 ) {
  console.log('phonebook:')
  Person
    .find({})
    .then(results => {
      results.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
}



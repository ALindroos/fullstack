describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
  
    const testUser = {
      username: 'testman',
      name: 'T. Elliot',
      password: 'test_test'
    }
    cy.request('POST', 'http://localhost:3003/api/users', testUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login').click()
  })

  describe('Login', function() {
    it('succeed with correct credentials', function() {
      cy.get('#username').type('testman')
      cy.get('#password').type('test_test')
      cy.get('#login-button').click()

      cy.contains('T. Elliot logged in')

      cy.get('#logout-button').click()
    })
    it('fails with incorrect credentials', function() {
      cy.get('#username').type('illegal')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('username')
    })
  })

  describe('Blog app', function() {
    
    describe.only('When logged in', function() {
      beforeEach(function () {
        cy.visit('http://localhost:3000')
        cy.get('#username').type('testman')
        cy.get('#password').type('test_test')
        cy.get('#login-button').click()
      })
      it('Blog can be created', function() {
        cy.get('#show').click()
        cy.get('#title').type('Testing ABC')
        cy.get('#author').type('Mike Careman')
        cy.get('#url').type('xyz/test')
        cy.get('#create-button').click()

        cy.contains('Testing ABC')
        cy.contains('Mike Careman')
      }) 
      it('Blog can be liked', function() {
        cy.get('#show').click()
        cy.get('#title').type('Testing ABC')
        cy.get('#author').type('Mike Careman')
        cy.get('#url').type('xyz/test')
        cy.get('#create-button').click()

        cy.get('#info-button').click()
        cy.contains('likes:0')

        cy.get('#like-button').click()
        cy.contains('likes:1')
      })
      it('Blog can be deleted', function() {
        cy.get('#show').click()
        cy.get('#title').type('Testing ABC')
        cy.get('#author').type('Mike Careman')
        cy.get('#url').type('xyz/test')
        cy.get('#create-button').click()
        cy.visit('http://localhost:3000')
        cy.get('#info-button').click()

        cy.contains('remove')
        cy.contains('#remove').click()
        cy.get('#remove-button').click()

        !cy.contains('Testing ABC')
      })
    })
  })



})
 
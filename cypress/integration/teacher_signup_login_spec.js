describe('Teacher Sign Up/ Log In', function() {

  let password = Math.random().toString(36).substring(3)
  let username = Math.random().toString(36).substring(3)

  it('Clicks on I am Teacher Link', function() {
    cy.visit('http://ec2-3-8-215-33.eu-west-2.compute.amazonaws.com/')
    cy.contains('I am a Teacher').click()
    cy.url().should('include', '/loginTeacher')
  })

  it('Clicks on Register Link', function() {
    cy.contains('Register').click()
    cy.url().should('include', '/registerTeacher')
  })

  it('Enters details and clicks sign up button', function() {
     cy.get('#first_name').type(Math.random().toString(36).substring(3))
     cy.get('#surname').type(Math.random().toString(36).substring(3))
     cy.get('#username').type(username)
     cy.get('#password').type(password)
     cy.get('#password2').type(password)
     // cy.contains('SIGN UP').click()
     cy.get('.btn').click()
     cy.url().should('include', '/loginTeacher')
  })

  it('Enters new username and password and logs in', function() {
     cy.get('#username').type(username)
     cy.get('#password').type(password)
     // cy.contains('SIGN UP').click()
     cy.get('.btn').click()
     cy.url().should('include', '/dashboardTeacher')
  })




})
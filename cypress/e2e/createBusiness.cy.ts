/// <reference types="cypress" />

describe("User create business", () => {

  it("should register", () => {
    cy.visit("http://localhost:3000/register")
    cy.get('[id="username"]').type('marko')
    cy.get('[id="email"]').type('marko@marko.com')
    cy.get('[id="password"]').type('marko123')
    cy.contains('button', 'Register').click()



  })

  it("should login", () => {
    cy.get('[id="identifier"]').type('antonijo')
    cy.get('[id="password"]').type('antonijo123')
    cy.contains('button', 'Sign In').click()
  });

});

/// <reference types="Cypress" />

describe('intercept with cypress examples', () => {

    xit ('test api with sample intercept', () => {
        cy.visit('https://jsonplaceholder.typicode.com/')
        cy.intercept({
            path: 'posts'
        }).as('posts')
        cy.get('a[href="/posts"]').eq(0).click()
        cy.wait('@posts').then(interception => {
            cy.log(JSON.stringify(interception))
            console.log(JSON.stringify(interception))
            expect(interception.response.body).to.have.length(100)
        })
    })
    xit ('mocking with intercept test with static response', () => {
        cy.visit('https://jsonplaceholder.typicode.com/')
        cy.intercept('GET', 'posts', {totalpost:5, name: 'david'}).as('posts')
        cy.get('a[href="/posts"]').eq(0).click()
        cy.wait('@posts')
        
    })
    it ('mocking with intercept test with dynamic fixture', () => {
        cy.visit('https://jsonplaceholder.typicode.com/')
        cy.intercept('GET', 'posts', {fixture: 'createUser.json'}).as('posts')
        cy.get('a[href="/posts"]').eq(0).click()
        cy.wait('@posts')
        
    })
}) 
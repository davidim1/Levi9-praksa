/// <reference types="Cypress" />

const dataJson = require('../fixtures/createUser.json')

describe('Delete user request', () => {
    let accessToken = 'c34f0fdf935377365dbb5d19f166eb18361909fdc2e65f1968b30cdb9043ee8d'
    
    

    it ('Create user test', () => {
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                'Authorization': 'Bearer '+ accessToken
            },
            body: {
                "name": "David Test Cypress API",
                "email": "davidlevi@gmail.com",
                "gender": "male",
                "status": "active"
            }
                   
        
        }).then((res) => {
            // cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)
            expect(res.body).has.property('email', 'davidlevi@gmail.com')
            expect(res.body).has.property('name', 'David Test Cypress API')
            expect(res.body).has.property('status', 'active')
            expect(res.body).has.property('gender', 'male')
        }).then((res) => {
            const userId = res.body.id
            cy.log("user id is: " + userId)

            cy.request({
                method: 'Delete',
                url: `https://gorest.co.in/public/v2/users/${userId}`,
                headers: {
                    'Authorization': 'Bearer '+ accessToken
                }
            }).then((res) => {
                expect(res.status).to.eq(204)
            })
            cy.request({
                failOnStatusCode: false,
                method: 'GET',
                url: `https://gorest.co.in/public/v2/users/${userId}`,
                headers: {
                    'authorization' : "Bearer " + accessToken
                }
            }).then((res)=>{
                expect(res.status).to.eq(404)                
            })
        })
        
    })

})
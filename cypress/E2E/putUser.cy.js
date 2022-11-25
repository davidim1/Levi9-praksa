/// <reference types="Cypress" />

const dataJson = require('../fixtures/createUser.json')

describe('Post user request', () => {
    let accessToken = 'c34f0fdf935377365dbb5d19f166eb18361909fdc2e65f1968b30cdb9043ee8d'
    let randomText = ""
    let testEmail = ""
    

    it ('Create user test', () => {
        var pattern = "QWERTYUIOPLKJHGFDASZXCVBNMmnbvcxzasdfghjklopuytrewq"
        for (var i = 0; i < 10; i++)
        randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length));
        testEmail = randomText + '@gmail.com'
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                'Authorization': 'Bearer '+ accessToken
            },
            body: {
                "name": "Jozo Cypress TEst",
                "email": "jozocypress@gmail.com",
                "gender": "male",
                "status": "inactive"
            }
                   
        
        }).then((res) => {
            // cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)
            expect(res.body).has.property('email', 'jozocypress@gmail.com')
            expect(res.body).has.property('name', 'Jozo Cypress TEst')
            expect(res.body).has.property('status', 'inactive')
            expect(res.body).has.property('gender', 'male')
        }).then((res) => {
            const userId = res.body.id
            cy.log("user id is: " + userId)

            cy.request({
                method: 'PUT',
                url: `https://gorest.co.in/public/v2/users/${userId}`,
                headers: {
                    'Authorization': 'Bearer '+ accessToken
                },
                body: {
                    "name": "LEvi Cypress TEst",
                    "email": "jozocypresslevi@gmail.com",
                    "gender": "male",
                    "status": "active"
                }

            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body).has.property('email', 'jozocypresslevi@gmail.com')
                expect(res.body).has.property('name', 'LEvi Cypress TEst')
                expect(res.body).has.property('status', 'active')
                expect(res.body).has.property('gender', 'male')



            })
        })
        
    })

})
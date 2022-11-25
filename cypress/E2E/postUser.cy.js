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
                "name": dataJson.name,
                "email": testEmail,
                "gender": dataJson.gender,
                "status": dataJson.status
            }
                   
        
        }).then((res) => {
            // cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)
            expect(res.body).has.property('email', testEmail)
            expect(res.body).has.property('name', dataJson.name)
            expect(res.body).has.property('status', dataJson.status)
            expect(res.body).has.property('gender', dataJson.gender)
        }).then((res) => {
            const userId = res.body.id
            cy.log("user id is: " + userId)

            cy.request({
                method: 'GET',
                url: `https://gorest.co.in/public/v2/users/${userId}`,
                headers: {
                    'Authorization': 'Bearer '+ accessToken
                }
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body).has.property('id', userId)
                expect(res.body).has.property('name', dataJson.name)
                expect(res.body).has.property('status', dataJson.status)
                expect(res.body).has.property('email', testEmail)



            })
        })
        
    })

})
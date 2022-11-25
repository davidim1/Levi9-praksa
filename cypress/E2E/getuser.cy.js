/// <reference types="Cypress" />

describe('get api users', () => {
    let accessToken = 'da267eadc8e30627050555b7d5e238cd2d6c52e219329c74fdd70a71e2e843b9'

    it ('get users', () => {
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users/3664',
            headers: {
                'authorization' : "Bearer " + accessToken
            }
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.gender).to.eq('male')
        })
    })

    it ('get users', () => {
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users/3661',
            headers: {
                'authorization' : "Bearer " + accessToken
            }
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.gender).to.eq('female')
        })
    })

})
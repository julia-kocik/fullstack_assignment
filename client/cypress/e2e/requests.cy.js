/// <reference types="cypress" />

describe("GET, DELETE, POST Tests", () => {
    beforeEach(() => {
        cy.visit("/")
    })

    it("checking getting events", () => {
       cy.request('api/events').as('getEvents')
       cy.get('@getEvents').should((response) => {
        expect(response).to.have.property('status', 200)
        expect(response.body).to.have.property('message', 'OK')
        expect(response.body.data).exist
      })
    })

    it("checking deleting events", () => {   
       cy.request('DELETE','api/events').as('deleteEvents')
       cy.get('@deleteEvents').should((response) => {
         expect(response).to.have.property('status', 200)
         expect(response.body).to.have.property('message', 'OK')
         expect(response.body.data.deletedCount).exist
       })
    })

    const requestOK = {
            firstName: 'firstname',
            lastName: 'lastName', 
            email: 'julia@gmail.com',
            date: '1994-05-23'
    }
    
    it("checking posting events, when correct data provided", () => {   
        cy.request('POST','api/events', requestOK).as('postEvent')
        cy.get('@postEvent').should((response) => {
          expect(response).to.have.property('status', 200)
          expect(response.body).to.have.property('message', 'OK')
        })
     })
 
    const requestFirstNameNotProvided = {
        firstName: '',
        lastName: 'lastName', 
        email: 'julia@gmail.com',
        date: '1994-05-23'
    }

    it("checking posting events, when firstname not provided", () => {   
        cy.request({url: 'api/events', method: 'POST', body: requestFirstNameNotProvided, failOnStatusCode: false}).as('postEventWithoutFn')
        cy.get('@postEventWithoutFn').should((response) => {
        expect(response).to.have.property('status', 500)
        expect(response.body.message).to.contain('provide firstname')
        })
    }) 

    const requestLastNameNotProvided = {
        firstName: 'firstName',
        lastName: '', 
        email: 'julia@gmail.com',
        date: '1994-05-23'
    }

    it("checking posting events, when lastname not provided", () => {   
        cy.request({url: 'api/events', method: 'POST', body: requestLastNameNotProvided, failOnStatusCode: false}).as('postEventWithoutLn')
        cy.get('@postEventWithoutLn').should((response) => {
        expect(response).to.have.property('status', 500)
        expect(response.body.message).to.contain('provide lastname')
        })
    }) 

    const requestEmailNameNotProvided = {
        firstName: 'firstName',
        lastName: 'lastName', 
        email: '',
        date: '1994-05-23'
    }

    it("checking posting events, when email not provided", () => {   
        cy.request({url: 'api/events', method: 'POST', body: requestEmailNameNotProvided, failOnStatusCode: false}).as('postEventWithoutEmail')
        cy.get('@postEventWithoutEmail').should((response) => {
        expect(response).to.have.property('status', 500)
        expect(response.body.message).to.contain('provide email')
        })
    })

    const requestEmailNotValid = {
        firstName: 'firstName',
        lastName: 'lastName', 
        email: 'julia',
        date: '1994-05-23'
    }

    it("checking posting events, when email is not valid", () => {   
        cy.request({url: 'api/events', method: 'POST', body: requestEmailNotValid, failOnStatusCode: false}).as('postEventWithoutVlEmail')
        cy.get('@postEventWithoutVlEmail').should((response) => {
        expect(response).to.have.property('status', 500)
        expect(response.body.message).to.contain('provide valid email')
        })
    })

    const requestDateNotProvided = {
        firstName: 'firstName',
        lastName: 'lastName', 
        email: 'julia@gmail.com',
        date: ''
    }

    it("checking posting events, when date is not provided", () => {   
        cy.request({url: 'api/events', method: 'POST', body: requestDateNotProvided, failOnStatusCode: false}).as('postEventWithoutDate')
        cy.get('@postEventWithoutDate').should((response) => {
        expect(response).to.have.property('status', 500)
        expect(response.body.message).to.contain('provide date')
        })
    })

    const requestDateNotValid = {
        firstName: 'firstName',
        lastName: 'lastName', 
        email: 'julia@gmail.com',
        date: '111'
    }

    it("checking posting events, when date is not valid", () => {   
        cy.request({url: 'api/events', method: 'POST', body: requestDateNotValid, failOnStatusCode: false}).as('postEventWithoutVlDate')
        cy.get('@postEventWithoutVlDate').should((response) => {
        expect(response).to.have.property('status', 500)
        expect(response.body.message).to.contain('provide valid date')
        })
    })
})
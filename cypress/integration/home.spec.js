/// <reference types="cypress" />

describe('Home page', () => {
    it('Successfully loads', () => {
        cy.visit('/');
    });
});

/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when username and password are wrong
 *   - should display homepage when username and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="johndoe@gmail.com"]').should('be.visible');
    cy.get('input[placeholder="••••••••"]').should('be.visible');
    cy.get('button').contains('Masuk').should('be.visible');
  });

  it('should display alert when Email is empty', () => {
    cy.get('button').contains('Masuk').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"Email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="johndoe@gmail.com"]').type('testuser@gmail.com');
    cy.get('button').contains('Masuk').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when username and password are wrong', () => {
    cy.get('input[placeholder="johndoe@gmail.com"]').type('testuser@gmail.com');
    cy.get('input[placeholder="••••••••"]').type('wrong_password');
    cy.get('button').contains('Masuk').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('User  Email or password is wrong');
    });
  });

  it('should display homepage when username and password are correct', () => {
    cy.get('input[placeholder="johndoe@gmail.com"]').type('tiara@gmail.com');
    cy.get('input[placeholder="••••••••"]').type('123456');
    cy.get('button').contains('Masuk').click();

  });
});

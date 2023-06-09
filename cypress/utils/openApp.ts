export const openApp = (url?: string) => {
  cy.visit(`http://localhost:3000/${url ? url : ''}`);
};

import { settings } from '../selectors/Settings.sel';
import { openApp } from '../utils/openApp';

const openModal = () => {
  cy.get(settings.openButton).click();
};

describe('Settings spec', () => {
  beforeEach(openApp);
  it('opens', () => {
    openModal();
    cy.get(settings.modalContainer).should('be.visible');
  });
  it('closes', () => {
    openModal();
    const closeButton = cy.get(settings.closeButton);
    closeButton.click();
    closeButton.should('not.be.visible');
  });

  it('changes theme', () => {
    openModal();
    cy.contains(settings.themeButton).click();
  });
});

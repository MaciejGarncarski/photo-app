import { settings } from '../selectors/Settings.sel';
import { openApp } from '../utils/openApp';
import { signInByDemoAccount } from '../utils/signInByDemoAccount';

const openModal = () => {
  cy.get(settings.openButton).click();
};

describe('Settings spec', () => {
  it('opens', () => {
    openApp();
    openModal();
  });
  it('closes', () => {
    openApp();
    openModal();
    const closeButton = cy.get(settings.closeButton);
    closeButton.click();
  });

  it('changes theme', () => {
    openApp();
    openModal();
    cy.contains(settings.themeButton).click();
  });

  it('visits users profile page', () => {
    openApp();
    signInByDemoAccount();
    openModal();
    cy.contains(/your profile/i).click();
  });
});

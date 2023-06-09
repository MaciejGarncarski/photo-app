import { settings } from '../selectors/Settings.sel';
import { openApp } from '../utils/openApp';
import { signInByDemoAccount } from '../utils/signInByDemoAccount';

describe('SignIn test', () => {
  it('should sign in', () => {
    openApp();
    signInByDemoAccount();
  });

  it('should sign out', () => {
    openApp();
    signInByDemoAccount();
    cy.get(settings.openButton).click();
    cy.contains(settings.signOutButton).click();
    cy.contains(settings.confirmButton).click();
  });
});

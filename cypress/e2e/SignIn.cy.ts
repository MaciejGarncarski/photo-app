import { settings } from '../selectors/Settings.sel';
import { signIn } from '../selectors/SignIn.sel';
import { openApp } from '../utils/openApp';

const signInByDemoAccount = () => {
  openApp();
  cy.get(signIn.button).click();
  cy.contains(signIn.demoAccountButton).click();
  cy.getCookie('sessionId');
};

describe('SignIn test', () => {
  it('should sign in', signInByDemoAccount);

  it('should sign out', () => {
    signInByDemoAccount();
    cy.get(settings.openButton).click();
    cy.contains(settings.signOutButton).click();
    cy.contains(settings.confirmButton).click();
  });
});

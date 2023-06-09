import { signIn } from '../selectors/SignIn.sel';

export const signInByDemoAccount = () => {
  cy.get(signIn.button).click();
  cy.contains(signIn.demoAccountButton).click();
  cy.getCookie('sessionId');
};

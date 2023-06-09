import { postModal } from '../selectors/PostModal.sel';
import { settings } from '../selectors/Settings.sel';
import { openApp } from '../utils/openApp';

describe('Post Modal', () => {
  it('should open', () => {
    openApp('admin');
    cy.get(postModal.accountPostLink).first().click();
  });
  it('should close', () => {
    openApp('admin');
    cy.get(postModal.accountPostLink).first().click();
    cy.get(settings.closeButton).click();
  });
});

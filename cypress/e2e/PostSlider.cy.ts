import { postSlider } from '../selectors/PostSlider.sel';
import { openApp } from '../utils/openApp';

describe('PostSlider', () => {
  it('should change images', () => {
    openApp();
    cy.contains(postSlider.nextImageButton).first().click();
    cy.wait(500);
    cy.contains(postSlider.previousImageButton).first().click();
  });
});

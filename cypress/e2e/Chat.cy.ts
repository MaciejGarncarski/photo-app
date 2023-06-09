import { chat } from '../selectors/Chat.sel';
import { openApp } from '../utils/openApp';
import { signInByDemoAccount } from '../utils/signInByDemoAccount';

describe('Chat', () => {
  it('should open chat room with first user', () => {
    openApp();
    signInByDemoAccount();
    cy.wait(500);
    openApp('chat');
    cy.get(chat.chatUser).first().click();
  });
  it('should search admins account and open chat room', () => {
    openApp();
    signInByDemoAccount();
    cy.wait(500);
    openApp('chat');
    cy.get(chat.searchInput).first().type('admin');
    cy.get(chat.searchForm).submit();
    cy.get(chat.chatUser).first().click();

    const chatRoomUsername = cy.get(chat.chatRoomUsername);
    chatRoomUsername.should('have.text', '@admin');
  });
});

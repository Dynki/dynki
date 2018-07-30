import { browser, element, by } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/');
  }

  getHeadingText() {
    return element(by.css('.login__heading')).getText();
  }
}

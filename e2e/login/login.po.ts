import { browser, element, by, ElementFinder } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/');
  }

  getHeadingText() {
    return element(by.css('.login__heading')).getText();
  }

  getUserName() {
    return element(by.id('username')).getAttribute('value');
  }

  setUserName(userName: string) {
    element(by.id('username')).sendKeys(userName);
  }

  getPassword() {
    return element(by.id('password')).getAttribute('value');
  }

  setPassword(password: string) {
    element(by.id('password')).sendKeys(password);
  }

  login(): ElementFinder {
    return element(by.id('loginBtn'));
  }
}

import { browser, element, by } from 'protractor';

export class HomePage {

  get heading() {
    return element(by.id('homeHeading'));
  }

  get userProfileIcon() {
    return element(by.id('userprofile-icon'));
  }

  get logout() {
    return element(by.id('3'));
  }

  navigateTo() {
    return browser.get('/home');
  }

  getHeadingText() {
    return element(by.id('homeHeading')).getText();
  }


}

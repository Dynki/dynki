import { browser, element, by } from 'protractor';

export class HomePage {

  get heading() {
    return element(by.id('homeHeading'));
  }

  navigateTo() {
    return browser.get('/home');
  }

  getHeadingText() {
    return element(by.id('homeHeading')).getText();
  }

}

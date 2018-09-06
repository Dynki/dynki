import { LoginPage } from './login.po';
import { HomePage } from '../home/home.po';
import { protractor, browser } from 'protractor';

describe('Dynki::Login', function() {
  let page: LoginPage;
  let homePage: HomePage;
  const credentials = {
    username: 'dynki@dynki.com',
    password: 'DynkiPassword1'
  };
  const wrongCredentials = {
    username: 'wrongname',
    password: 'wrongpassword'
  }

  beforeEach(() => {
    page = new LoginPage();
    homePage = new HomePage();
  });

  it('should display a heading of log in', () => {
    page.navigateTo();
    expect(page.getHeadingText()).toEqual('Log In');
  });

  it('should set the username', () => {
    page.navigateTo();
    page.setUserName(credentials.username);
    expect(page.getUserName()).toEqual(credentials.username);
  });

  it('should set the password', () => {
    page.navigateTo();
    page.setPassword(credentials.password);
    expect(page.getPassword()).toEqual(credentials.password);
  });

  it('should succuessfully log in the user and redirect to home page', () => {
    page.navigateTo();
    page.setUserName(credentials.username);
    page.setPassword(credentials.password);
    page.login().click().then(() => {
      browser.waitForAngularEnabled(true);
      browser.sleep(3000);
      expect(homePage.getHeadingText()).toEqual('home');
    });
  });

  it('should should stay on login screen if wrong credentials entered', () => {
    page.navigateTo();
    page.setUserName(credentials.username);
    page.setPassword(credentials.password);
    page.login().click().then(() => {
      browser.waitForAngularEnabled(true);
      browser.sleep(3000);
      homePage.userProfileIcon.click().then(() => {
        homePage.logout.click().then(() => {
          browser.waitForAngularEnabled(true);
          browser.sleep(3000);
          page.setUserName(wrongCredentials.username);
          page.setPassword(wrongCredentials.password);
          page.login().click().then(() => {
            browser.waitForAngular();
            browser.sleep(3000);
            expect(page.getHeadingText()).toEqual('Log In');
          });
        });
      });
    });
  });

});

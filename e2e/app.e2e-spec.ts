import { LoginPage } from './app.po';

describe('Dynki App', function() {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('should display a heading of log in', () => {
    page.navigateTo();
    expect(page.getHeadingText()).toEqual('Log In');
  });
});

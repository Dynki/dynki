import { DynkiPage } from './app.po';

describe('gimly App', function() {
  let page: DynkiPage;

  beforeEach(() => {
    page = new DynkiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

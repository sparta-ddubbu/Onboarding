import { PAGE_URLS } from '../../src/constants/page-urls';

describe('[E2E] 로그인', () => {
  const baseUrl = 'http://localhost:3000';

  before(() => {
    cy.visit(baseUrl);
  });

  it('로그인 페이지로 이동하기', () => {
    cy.get(`a[href="${PAGE_URLS.signIn}"]`).click();
    cy.url().should('include', PAGE_URLS.signIn);
  });

  it('회원 정보 입력하기', () => {
    cy.visit(`${baseUrl}${PAGE_URLS.signIn}`);

    const userInfo = { email: 'hello', password: '123456' };

    cy.get('input[type="text"]').type(userInfo.email);
    cy.get('input[type="password"]').type(userInfo.password);
    cy.get('button[type="submit"]').click();

    cy.contains('로그아웃').should('be.visible');
  });
});

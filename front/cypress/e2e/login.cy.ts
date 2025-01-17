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

    // fixtures에서 사용자 데이터를 로드
    cy.fixture('users').then((users) => {
      const userInfo = users[0]; // 첫 번째 사용자 데이터 사용

      // 로그인 폼에 입력
      cy.get('input[type="text"]').type(userInfo.nickname);
      cy.get('input[type="password"]').type(userInfo.password);
      cy.get('button[type="submit"]').click();

      // 로그인 후 "로그아웃" 텍스트가 화면에 있는지 확인
      cy.contains('로그아웃').should('be.visible');
    });
  });
});

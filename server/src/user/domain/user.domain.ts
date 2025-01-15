export class UserDomain {
  id: string;
  nickname: string;
  password: string;

  constructor(user: { id: string; nickname: string; password: string }) {
    this.id = user.id;
    this.nickname = user.nickname;
    this.password = user.password;
  }
}

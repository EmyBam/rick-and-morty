export class User {
  constructor(
    public email: string,
    public password: string,) {
  }
}

const USER_CREDS = new User('user@email.com', 'rickyPass');

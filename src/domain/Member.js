/* @flow */
import User from './User';

export default class Member {
  isAdmin: boolean;
  user: User;
  constructor(isAdmin: boolean, user: User) {
    this.isAdmin = isAdmin;
    this.user = user;
  }
}

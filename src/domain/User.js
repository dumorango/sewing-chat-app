/* @flow */
export default class User {
  uid: string = '';
  displayName: string = '';
  email: string = '';
  photoUrl: string = '';
  constructor(uid: string, displayName: string, email: string, photoUrl: string) {
    this.uid = uid || this.uid;
    this.displayName = displayName || this.displayName;
    this.email = email || this.email;
    this.photoUrl = photoUrl || this.photoUrl;
  }
  static fromObject({ uid, displayName, email, photoUrl}) {
    return new User(uid, displayName, email, photoUrl);
  }
}

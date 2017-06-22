import {Record} from "immutable";

interface IUser {
    uid?: string;
    displayName?: string;
    email?: string;
    photoURL?: string;
}

export class User extends Record({
    displayName: null,
    email: null,
    photoURL: null,
    uid: null,
}) {

  public uid: string;
  public displayName: string;
  public email: string;
  public photoURL: string;

  public constructor(params?: IUser) {
      params ? super(params) : super();
  }
}

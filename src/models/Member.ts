import {Record} from "immutable";
import { User } from "./User";

interface IMember {
    isAdmin: boolean;
    user: User;
}

export class Member extends Record({
    isAdmin: false,
    user: null,
 }) {

  public isAdmin: boolean;
  public user: User;

  public constructor(params?: IMember) {
    super(params);
 }
}

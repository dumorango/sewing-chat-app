import { Map } from "immutable";
import { Member } from "./Member";

import {Record} from "immutable";

interface IGroup {
    key: string;
    members: Map<string, Member>;
    name: string;
    privacy: boolean;
    photoURL: string;
}

export class Group extends Record({
    key: "",
    members: Map<string, Member>(),
    name: "",
    photoURL: "",
    privacy: false,
}) {

  public key: string;
  public name: string;
  public privacy: boolean;
  public photoURL: string;
  public members: Map<string, Member>;

  public constructor(params?: IGroup) {
     super(params);
  }
}

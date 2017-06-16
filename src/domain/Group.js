/* @flow */
import Member from './Member';

export default class Group {
  key: string;
  name: string;
  privacy: boolean;
  photoUrl: string;
  members: Map<string, Member>;
  constructor(key: string, name: string, privacy: boolean, photoUrl: string, members: Map<string, Member>) {
    this.key = key;
    this.name = name;
    this.privacy = privacy;
    this.photoUrl = photoUrl;
    this.members = members;
  }
}


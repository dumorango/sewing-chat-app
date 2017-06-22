import { List, Map, Record } from "immutable";
import { makeTypedFactory, recordify, TypedRecord } from "typed-immutable-record";
import {
    Group,
    User,
} from "../models";

export interface ILoginState {
        user: User;
}

interface IMainState {
    users: List<User>;
    groups: Map<string, Group>;
}

export interface IMainStateRecord extends TypedRecord<IMainStateRecord>, IMainState {}

interface IGroupFormState {
    values: Group;
    initial: Group;
}

interface IFormState {
    group: Map<string, Group>;
}

interface IGlobalState {
    login?: ILoginState;
    main?: IMainState;
    form?: Map<string, any>;
    routing?: {};
}

export interface IStateRecord extends TypedRecord<IStateRecord>, IGlobalState {}

export const initialState = recordify<IGlobalState, IStateRecord>({
    form: Map<string, any>(),
    login: {
        user: null,
    },
    main: recordify<IMainState, IMainStateRecord>({
        groups: Map<string, Group>(),
        users: List<User>(),
    }),
    routing: {},
});

console.log("initialState: ", initialState);


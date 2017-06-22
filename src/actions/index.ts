import { Action } from "redux";
import {
    FILE_UPLOAD,
    FILE_UPLOAD_ERROR,
    FILE_UPLOAD_SUCCESS,
    IActionType,
    LOGOUT,
    NEW_GROUP,
} from "../constants";
import {Group, User} from "../models";

export interface IReduxAction extends Action {
    type: IActionType;
    payload?: any;
}

export interface IReduxFormAction<K, V> extends IReduxAction {
    meta: {
        form: string,
        K: {
            values: V,
        },
    };
}

export interface IFileUploadAction extends IReduxAction {
    payload: {
        file: File,
    };
}

export interface IFileUploadSuccess extends IReduxAction {
    payload: {
        downloadUrl: string,
    };
}

export function fileUploadSuccess(downloadUrl: string): IFileUploadSuccess {
    return ({
        payload: {
            downloadUrl,
        },
        type: FILE_UPLOAD_SUCCESS,
    });
}

export interface IFileUploadError extends IReduxAction {
    payload: Error;
}

export function fileUploadError(error: Error): IFileUploadError {
    return ({
        payload: error,
        type: FILE_UPLOAD_ERROR,
    });
}

export interface INewEntityAction<E> extends IReduxAction {
    payload: E;
}

//noinspection TsLint
export interface INewGroupAction extends INewEntityAction<Group> {}
// noinspection TsLint
export interface INewUserAction extends INewEntityAction<User> {}

export function newGroup(group: Group): INewGroupAction {
    return ({
        payload: group,
        type: NEW_GROUP,
    });
}

// noinspection TsLint
export interface INewUserAction extends IReduxAction {
    payload: User;
}

// noinspection TsLint
export interface ILogoutAction extends IReduxAction {};

export function logout(): ILogoutAction {
    return {
        type: LOGOUT,
    };
}

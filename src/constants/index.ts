
// noinspection TsLint
export interface IActionType extends String {}

export const BOOT: IActionType = "BOOT";
export const NEW_GROUP: IActionType = "NEW_GROUP";
export const NEW_USER: IActionType = "NEW_USER";
export const LOGIN: IActionType = "LOGIN";
export const LOGOUT: IActionType = "LOGOUT";
export const UPLOAD_PHOTO: IActionType = "UPLOAD_PHOTO";
export const UPLOAD_PHOTO_SUCCESS: IActionType = "UPLOAD_PHOTO_SUCCESS";
export const UPLOAD_PHOTO_ERROR: IActionType = "UPLOAD_PHOTO_ERROR";
export const FILE_UPLOAD_SUCCESS: IActionType = "FILE_UPLOAD_SUCCESS";
export const FILE_UPLOAD_ERROR: IActionType = "FILE_UPLOAD_ERROR";
export const FILE_UPLOAD: IActionType = "FILE_UPLOAD";

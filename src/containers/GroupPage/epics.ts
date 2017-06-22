import { Action, Store } from "redux";
import { stopSubmit } from "redux-form";
import { ActionsObservable } from "redux-observable";
import { Observable, Observer } from "rxjs";
import {
    fileUploadError,
    fileUploadSuccess,
    IFileUploadAction,
    IReduxFormAction,
    newGroup,
} from "../../actions";
import { IStateRecord } from "../../store/state";

import {
    UPLOAD_PHOTO,
} from "../../constants";
import { Group } from "../../models";
import firebase from "../../store/firebase";

const uploadToStorageObservable = (file: File, path: string) : Observable<string> =>
    Observable.create((observer: Observer<string>) => {
      const baseRef = firebase.storage().ref();
      const groupPhotosBucket = baseRef.child(path);
      const uploadTask = groupPhotosBucket.put(file);
      uploadTask.on("state_changed",
            (snapshot) => console.log(snapshot.bytesTransferred),
            observer.error,
            () => observer.next(uploadTask.snapshot.downloadURL) ,
        );
});

function updateObservable<T>(path: string, existingKey: string, object: T): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
        const ref = firebase.database().ref(path);
        const key = existingKey || ref.push().key;
        const updates = {};
        updates[`${path}/${key}`] = object;
        firebase.database()
            .ref()
            .update(updates)
            .then(() =>
                observer.next(object),
            )
            .catch((err) =>
                observer.error(err),
            );
    });
}

const getKeyByPath = (path: string) => {
  return firebase.database().ref(path);
};

const GROUPS_PATH = "/groups";

export const groupEpic =
    (action$: ActionsObservable<IReduxFormAction<"group", Group>>, store: Store<IStateRecord>): Observable<Action> =>
      action$
        .ofType("@@redux-form/START_SUBMIT")
        .filter((action) => action.meta.form === "group")
        .mergeMap(() => {
          const group: Group = store.getState().form.get('group').get("values");
          return updateObservable(GROUPS_PATH, group.key || getKeyByPath(GROUPS_PATH), group)
                    .mergeMap((savedGroup: Group) => Observable.of(
                        stopSubmit("group"),
                        newGroup(group),
                    ))
                    .catch((err) => Observable.of(stopSubmit("group", err)));
        });

export const uploadEpic =
    (action$: ActionsObservable<IFileUploadAction>, store: Store<IStateRecord>): Observable<Action> => {
        const user = firebase.auth().currentUser;
        return action$
                .ofType(UPLOAD_PHOTO)
                .mergeMap((action) =>
                    uploadToStorageObservable(
                        action.payload.file,
                        `${user.uid}/uploads/images/${new Date().toString()}`,
                    ).map((downloadUrl) => fileUploadSuccess(downloadUrl))
                     .catch((err: Error) => Observable.of(fileUploadError(err))),
                );
};

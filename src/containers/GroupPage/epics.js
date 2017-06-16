/* @flow */
import Rx, { Observable } from 'rxjs';
import { stopSubmit } from 'redux-form';
import {
    UPLOAD_PHOTO,
    UPLOAD_PHOTO_SUCCESS,
    UPLOAD_PHOTO_ERROR,
    NEW_GROUP,
} from '../../constants';
import firebase from '../../store/firebase';
import Group from '../../domain/Group';

const uploadToStorageObservable = (file: File, path: string) => Rx.Observable.create((observer) => {
  const baseRef = firebase.storage().ref();
  const groupPhotosBucket = baseRef.child(path);
  const uploadTask = groupPhotosBucket.put(file);
  uploadTask.on('state_changed',
            (snapshot) => console.log(snapshot.bytesTransferred),
            observer.error,
            () => observer.next({ downloadUrl: uploadTask.snapshot.downloadURL }),
        );
});


const updateObservable = (path, object) => Rx.Observable.create((observer) => {
  const ref = firebase.database().ref(path);
  const key = object.key || ref.push().key;
  const updates = {};
  updates[`${path}/${key}`] = object;
  firebase.database()
      .ref()
      .update(updates)
      .then(() => observer.next(object))
      .catch((err) => observer.error(err));
});

const setKey = (path: string, object: Object) => {
  const ref = firebase.database().ref(path);
  return Object.assign({ key: object.key || ref.push().key }, object);
};

const GROUPS_PATH = '/groups';

export const groupEpic = (action$: Observable, store : Object) =>
    action$
        .ofType('@@redux-form/START_SUBMIT')
        .filter((action) => action.meta.form === 'group')
        .mergeMap(() => {
          const group: Group = setKey(GROUPS_PATH, store.getState().toJS().form.group.values);
          return updateObservable(GROUPS_PATH, group)
                    .mergeMap(() => Rx.Observable.merge(
                        stopSubmit('group'),
                        ({ type: NEW_GROUP, payload: { key: group.key, value: group }})
                    ))
                    .catch((err) => Rx.Observable.of(stopSubmit('group', err)));
        }
        );

export const uploadEpic = (action$: Observable, store: Object) => {
  const user = firebase.auth().currentUser;
  return action$
        .ofType(UPLOAD_PHOTO)
        .mergeMap((action) =>
            uploadToStorageObservable(action.payload.file, `${user.uid}/uploads/images/${new Date().toString()}`)
                .map(({ downloadUrl }) => store.dispatch({
                  type: UPLOAD_PHOTO_SUCCESS,
                  payload: downloadUrl,
                }))
                .catch((err) => store.dispatch({
                  type: UPLOAD_PHOTO_ERROR,
                  error: err,
                })),
        );
};

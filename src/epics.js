// @flow
import { combineEpics } from 'redux-observable';

import Rx from 'rxjs';
import { groupEpic, uploadEpic } from 'containers/GroupPage/epics';

import { BOOT, NEW_GROUP, NEW_USER, LOGIN } from './constants';
import User from './domain/User';
import firebase from './store/firebase';

const refObservable = (path, event) => Rx.Observable.create((observer) => {
  const ref = firebase.database().ref(path);
  ref.on(event,
    (data) => observer.next(
        { key: data.key, value: data.val()}
    )
  );
});

const loginObservable = Rx.Observable.create((observer) =>
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      firebase.auth().signInAnonymously();
    } else {
      observer.next(user);
    }
  })
);

const bootEpic = (action$) =>
    action$.ofType(BOOT)
        .mergeMap(() => Rx.Observable.merge(
            refObservable('/users', 'child_added')
                .map((data) => ({
                  type: NEW_USER,
                  payload: User.fromObject(data.value),
                })),
            refObservable('/groups/public', 'child_added')
                .map((group) => ({
                  type: NEW_GROUP,
                  payload: group,
                })),
            loginObservable
                .map((user) => ({
                  type: LOGIN,
                  payload: User.fromObject(user),
                })),
        ));

export const rootEpic = combineEpics(
  bootEpic,
  groupEpic,
  uploadEpic
);

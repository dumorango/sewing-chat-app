import { Action, Store } from "redux";
import { ActionsObservable, combineEpics } from "redux-observable";
import { Observable, Observer } from "rxjs";
import { BOOT, LOGIN, NEW_GROUP, NEW_USER } from "./constants";
import { groupEpic, uploadEpic } from "./containers/GroupPage/epics";
import { User } from "./models";
import firebase from "./store/firebase";
import { IStateRecord } from "./store/state";

const refObservable = (path, event) => Observable.create((observer: Observer<any>) => {
  const ref = firebase.database().ref(path);
  ref.on(event,
    (data) => observer.next(
        { key: data.key, value: data.val() },
    ),
  );
});

const loginObservable = Observable.create((observer) =>
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      firebase.auth().signInAnonymously();
    } else {
      observer.next(new User(user));
    }
  }),
);

const bootEpic = (action$: ActionsObservable<Action>, store: Store<IStateRecord>): Observable<Action> =>
    action$.ofType(BOOT)
        .mergeMap(() => Observable.merge(
            refObservable("/users", "child_added")
                .map((data) => ({
                    payload: { key: data.key, ...data.value },
                    type: NEW_USER,
                })),
            refObservable("/groups/public", "child_added")
                .map((data) => ({
                    payload: { key: data.key, ...data.value },
                    type: NEW_GROUP,
                })),
            refObservable("/groups/public", "child_changed")
                .map((data) => ({
                    payload: { key: data.key, ...data.value },
                    type: NEW_GROUP,
                })),
            loginObservable
                .map((user) => ({
                    payload: user,
                    type: LOGIN,
                })),
        ));

export const rootEpic = combineEpics(
  bootEpic,
  groupEpic,
  uploadEpic,
);

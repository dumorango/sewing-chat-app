import { fromJS } from "immutable";
import { routerMiddleware } from "react-router-redux";
import {
    applyMiddleware,
    compose,
    createStore,
    GenericStoreEnhancer,
    Store,
    StoreEnhancerStoreCreator,
} from "redux";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "./epics";
import createReducer from "./reducers";
import { IStateRecord } from "./store/state";

const epicMiddleware = createEpicMiddleware(rootEpic);

export function configureStore(initialState: IStateRecord, history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    epicMiddleware,
    routerMiddleware(history),
  ];

  const enhancers: GenericStoreEnhancer[] = [
    applyMiddleware(...middlewares),
  ];

  //noinspection TypeScriptUnresolvedVariable
  const finalCompose = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
  const store: Store<IStateRecord> = createStore<IStateRecord>(
    createReducer({}),
    initialState,
    // finalCompose<StoreEnhancerStoreCreator<IStateRecord>>(...enhancers),
    finalCompose(...enhancers),
  );

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     import('./reducers').then((reducerModule) => {
  //       const createReducers = reducerModule.default;
  //       const nextReducers = createReducers(store.asyncReducers);
  //
  //       store.replaceReducer(nextReducers);
  //     });
  //   });
  // }
  return store;
}

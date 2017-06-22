/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */
import { routerReducer } from "react-router-redux";
import {
    Reducer,
} from "redux";
import { reducer as formReducer } from "redux-form/immutable";
import { combineReducers } from "redux-immutable";
import { ILoginState } from "./store/state";

import { IReduxAction } from "./actions";
import { LOGIN } from "./constants";
import mainReducer from "./containers/MainPage/reducer";
import { User } from "./models";

const loginReducer: Reducer<ILoginState> = (state: ILoginState, action: IReduxAction) => {
  switch (action.type) {
      case LOGIN:
        const user: User = action.payload;
        return {
            user,
        };
    default:
      return state;
  }
};
/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
      form: formReducer,
      login: loginReducer,
      // language: languageProviderReducer,
      main: mainReducer,
      routing: routerReducer,
      ...asyncReducers,
  });
}

import { List, Map } from "immutable";
import { combineReducers } from "redux-immutable";
import { INewGroupAction, INewUserAction } from "../../actions";
import { NEW_GROUP, NEW_USER } from "../../constants/";
import { Group, User } from "../../models";

function channelReducer(state: Map<string, Group>, action: INewGroupAction) {
  switch (action.type) {
      case NEW_GROUP:
          const group: Group = action.payload;
          return state.set(
                      group.key,
                      group,
                  );
      default:
          return state;
  }
}

function userReducer(state: List<User>, action: INewUserAction) {
     switch (action.type) {
         case NEW_USER:
            return state.push(new User(action.payload));
         default:
            return state;
    }
}

export default combineReducers({
    groups: channelReducer,
    users: userReducer,
});

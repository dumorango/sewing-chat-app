/* @flow */
import { fromJS, List, Map } from 'immutable';
import { NEW_GROUP, NEW_USER } from '../../constants';

import Group from '../../domain/Group';
// import User from '../../domain/User';

const getPayloadAsGroup = (payload) => {
  const { key, value: { name, privacy, photoUrl, members } } = payload;
  const g: Group = new Group(key, name, privacy, photoUrl, members);
  return g;
};


function channelReducer(state: Map = fromJS({}), action: Object) {
  switch (action.type) {
    case NEW_GROUP:
      return state.set(
              'groups',
              (state.get('groups') || Map())
                .set(
                    action.payload.key,
                    getPayloadAsGroup(action.payload)
                )
            );
    case NEW_USER:
      return state.set('users', (state.get('users') || List()).push(action.payload));
    default:
      return state;
  }
}

export default channelReducer;

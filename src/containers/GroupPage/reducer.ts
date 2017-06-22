import { fromJS, List } from 'immutable';
import { UPLOAD_PHOTO_SUCCESS, UPLOAD_PHOTO_ERROR } from '../../constants';

function channelReducer(state = fromJS({}), action) {
  switch (action.type) {
    case UPLOAD_PHOTO_SUCCESS:
      return state.set('form/group/values/photoURL', action.payload);
    case UPLOAD_PHOTO_ERROR:
      return state.set('form/group/values/photoURL', action.payload);
    default:
      return state;
  }
}

export default channelReducer;

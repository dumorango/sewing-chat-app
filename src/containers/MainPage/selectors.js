/* @flow */
// noinspection JSUnresolvedVariable
import { createSelector } from 'reselect';
import { Map } from 'immutable';
import Group from '../../domain/Group';
/**
 * Direct selector to the chat state domain
 */
const getGroups = (state) => state.getIn(['main', 'groups']) || Map();
const getFilter = (state) => state.getIn(['form', 'main', 'values', 'filter']);

/**
 * Other specific selectors
 */


/**
 * Default selector used by App
 */

export const getFilteredGroups = createSelector(
  [getGroups, getFilter],
  (groups: Map, filter: string) => groups
      //.filter(
      //    (group: Group) => filter && group.displayName && group.displayName.indexOf(filter) !== -1
      //)
      .toList(),
);


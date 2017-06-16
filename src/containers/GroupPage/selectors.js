/* @flow */
import { createSelector } from 'reselect';
import { Map } from 'immutable';
import Group from '../../domain/Group';
/**
 * Direct selector to the chat state domain
 */
const getGroups = (state) => state.getIn(['main', 'groups']) || Map();
const getFilter = (state) => state.getIn(['form', 'main', 'values', 'filter']);


export const getGroupsAsList = createSelector(
    [getGroups],
    (groups: Map<string, Group>) => groups.toList(),
);


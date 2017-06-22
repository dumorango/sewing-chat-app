import { Map } from "immutable";
import { createSelector } from "reselect";

import { Group } from "../../models";
/**
 * Direct selector to the chat state models
 */
const getGroups = (state) => state.getIn(["main", "groups"]) || Map();
// const getFilter = (state) => state.getIn(["form", "main", "values", "filter"]);

export const getGroupsAsList = createSelector(
    [getGroups],
    (groups: Map<string, Group>) => groups.toList(),
);

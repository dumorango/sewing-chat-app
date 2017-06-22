// noinspection JSUnresolvedVariable
import { List, Map } from "immutable";
import { createSelector } from "reselect";
import { Group } from "../../models";
import { IStateRecord } from "../../store/state";

const getGroups = (state: IStateRecord): Map<string, Group> => state.getIn(["main", "groups"]);
const getFilter = (state: IStateRecord): string => state.getIn(["form", "main", "values", "filter"]);

export const getFilteredGroups = createSelector(
  [getGroups, getFilter],
  (groups: Map<string, Group>, filter: string) => groups
      .toList()
      .filter((group: Group) => filter && group.name && group.name.indexOf(filter) !== -1),
);

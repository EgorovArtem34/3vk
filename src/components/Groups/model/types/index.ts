export interface User {
  first_name: string;
  last_name: string;
}

export interface Group {
  id: number;
  name: string;
  closed: boolean;
  avatar_color?: string;
  members_count: number;
  friends?: User[];
}

export interface GetGroupsResponse {
  result: 1 | 0;
  data?: Group[];
}

export interface Filters {
  typePrivate: string;
  avatarColor: string;
  friendsFilter: string;
}

export interface GroupsState {
  groups: Group[];
  filteredGroups: Group[];
  errors: {
    fetchGroupsErr: null | string;
  };
  isLoadings: {
    isFetchGroupsLoading: boolean;
  };
  filters: Filters;
}

export enum FriendsType {
  ALL = "all",
  YES = "yes",
  NO = "no",
}

export enum PrivateType {
  ALL = "all",
  OPEN = "open",
  CLOSE = "close",
}

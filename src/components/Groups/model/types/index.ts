interface User {
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

export interface GroupsState {
  groups: Group[];
  errors: {
    fetchGroupsErr: null | string;
  };
  isLoadings: {
    isFetchGroupsLoading: boolean;
  };
}
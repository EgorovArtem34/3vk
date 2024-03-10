import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Group, GroupsState } from "../types";
import { IError } from "@/store/types";
import { filterGroup } from "@/utils/filterGroup";

export const fetchGroups = createAsyncThunk("groups/fetchGroups", async () => {
  try {
    const groups = await axios.get("http://localhost:3000/groupDB");
    const { data } = groups;
    if (
      data.result === 0 ||
      !Object.prototype.hasOwnProperty.call(data, "data")
    ) {
      throw new Error("fetch error");
    }
    return data.data;
  } catch (err) {
    const error = err as AxiosError<IError>;
    throw error.message;
  }
});

const initialState: GroupsState = {
  groups: [],
  filteredGroups: [],
  errors: {
    fetchGroupsErr: null,
  },
  isLoadings: {
    isFetchGroupsLoading: false,
  },
  filters: {
    typePrivate: "all",
    avatarColor: "all",
    friendsFilter: "all",
  },
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setFilterTypePrivateGroup: (state, { payload }: PayloadAction<string>) => {
      state.filters.typePrivate = payload;
    },
    setFilterAvatarColor: (state, { payload }: PayloadAction<string>) => {
      state.filters.avatarColor = payload;
    },
    setFilterHasFriends: (state, { payload }: PayloadAction<string>) => {
      state.filters.friendsFilter = payload;
    },
    makeFilterGroup: (state) => {
      const currentFilteredGroups = filterGroup(state.groups, state.filters);
      return {
        ...state,
        filteredGroups: currentFilteredGroups,
      };
    },
    setIsFetchGroupsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoadings.isFetchGroupsLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.errors.fetchGroupsErr = null;
        state.isLoadings.isFetchGroupsLoading = true;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.errors.fetchGroupsErr = action.payload as string;
        state.isLoadings.isFetchGroupsLoading = false;
      })
      .addCase(
        fetchGroups.fulfilled,
        (state, { payload }: PayloadAction<Group[]>) => {
          state.groups = payload;
          state.filteredGroups = payload;
          state.errors.fetchGroupsErr = null;
          state.isLoadings.isFetchGroupsLoading = false;
        }
      );
  },
});

export const {
  setFilterTypePrivateGroup,
  setFilterAvatarColor,
  setFilterHasFriends,
  makeFilterGroup,
  setIsFetchGroupsLoading,
} = groupsSlice.actions;
export default groupsSlice.reducer;

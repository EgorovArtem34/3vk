import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { GetGroupsResponse, Group, GroupsState } from "../types";
import { IError } from "@/store/types";

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
  errors: {
    fetchGroupsErr: null,
  },
  isLoadings: {
    isFetchGroupsLoading: false,
  },
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
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
          state.errors.fetchGroupsErr = null;
          state.isLoadings.isFetchGroupsLoading = false;
        }
      );
  },
});

// export const {} = groupsSlice.actions;
export default groupsSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import groupSlice from "@/components/Groups/model/slices/groupsSlice";

const store = configureStore({
  reducer: {
    groupSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

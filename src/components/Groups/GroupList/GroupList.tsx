import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchGroups } from "../model/slices/groupsSlice";

export const GroupList = () => {
  const dispatch = useAppDispatch();
  // const { groups } = useAppSelector((state) => state.groupSlice);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  // console.log("S!!!", groups);
  return (
    <div className="container">
      <span>2</span>
    </div>
  );
};

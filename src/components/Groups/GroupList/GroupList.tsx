import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchGroups } from "../model/slices/groupsSlice";
import { GroupItem } from "../GroupItem/GroupItem";
import styles from "./GroupList.module.scss";

const delay = 1000;

export const GroupList = () => {
  const dispatch = useAppDispatch();
  const {
    groups,
    isLoadings: { isFetchGroupsLoading },
    errors: { fetchGroupsErr },
  } = useAppSelector((state) => state.groupSlice);

  useEffect(() => {
    const debouncedFetchGroups = setTimeout(() => {
      dispatch(fetchGroups());
    }, delay);

    return () => clearTimeout(debouncedFetchGroups);
  }, [dispatch]);

  if (isFetchGroupsLoading) {
    return <div className={styles.groups}>...Loading</div>;
  }

  return (
    <div className={styles.groups}>
      {!fetchGroupsErr ? (
        groups.map((group) => <GroupItem group={group} key={group.id} />)
      ) : (
        <p>fetch error: {fetchGroupsErr}</p>
      )}
    </div>
  );
};

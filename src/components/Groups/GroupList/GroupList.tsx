import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchGroups } from "../model/slices/groupsSlice";
import { GroupItem } from "../GroupItem/GroupItem";
import styles from "./GroupList.module.scss";
import { delay } from "../model/constants";

export const GroupList = () => {
  const dispatch = useAppDispatch();
  const {
    filteredGroups: currentGroups,
    isLoadings: { isFetchGroupsLoading },
    errors: { fetchGroupsErr },
  } = useAppSelector((state) => state.groupSlice);

  useEffect(() => {
    const debouncedFetchGroups = setTimeout(() => {
      dispatch(fetchGroups());
    }, delay);

    return () => clearTimeout(debouncedFetchGroups);
  }, [dispatch]);

  if (isFetchGroupsLoading || fetchGroupsErr) {
    return (
      <div className={styles.groups}>
        <p className="text-center">
          {fetchGroupsErr ? `fetch error: ${fetchGroupsErr}` : "...Загрузка"}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.groups}>
      {currentGroups.length > 0 ? (
        <>
          <h1 className={styles.title}>Список групп</h1>
          {currentGroups.map((group) => (
            <GroupItem group={group} key={group.id} />
          ))}
        </>
      ) : (
        <p className="text-center">Групп не найдено</p>
      )}
    </div>
  );
};

import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { Select } from "@/ui//Select/Select";
import {
  setFilterAvatarColor,
  setFilterTypePrivateGroup,
  setFilterHasFriends,
  makeFilterGroup,
} from "../model/slices/groupsSlice";
import { FriendsType, Group, PrivateType } from "../model/types";
import styles from "./GroupFilters.module.scss";

export type AvatarColors = { [key: string]: string };

export const GroupFilters = () => {
  const dispatch = useAppDispatch();
  const {
    groups,
    filters: { typePrivate, avatarColor, friendsFilter },
  } = useAppSelector((state) => state.groupSlice);

  const typePrivateGroupOptions = useMemo(
    () => [
      {
        value: PrivateType.ALL,
        content: "Все",
      },
      {
        value: PrivateType.OPEN,
        content: "Открытая",
      },
      {
        value: PrivateType.CLOSE,
        content: "Закрытая",
      },
    ],
    []
  );

  const avatarColors: AvatarColors = groups.reduce(
    (acc: AvatarColors, group: Group) => {
      if (group.avatar_color && !(group.avatar_color in acc)) {
        acc[group.avatar_color] = group.avatar_color;
      }
      return acc;
    },
    {}
  );

  const avatarColorOptions = useMemo(() => {
    const tempAvatarColors = Object.keys(avatarColors).map((color) => ({
      value: color,
      content: color,
    }));
    return [{ value: "all", content: "Все" }, ...tempAvatarColors];
  }, [avatarColors]);

  const friendsOptions = useMemo(
    () => [
      {
        value: FriendsType.ALL,
        content: "Все",
      },
      {
        value: FriendsType.YES,
        content: "Есть",
      },
      {
        value: FriendsType.NO,
        content: "Нет",
      },
    ],
    []
  );

  const changeFilterTypePrivateGroup = (newPrivateType: string) => {
    dispatch(setFilterTypePrivateGroup(newPrivateType));
    dispatch(makeFilterGroup());
  };

  const changeFilterAvatarColors = (newAvatarColor: string) => {
    dispatch(setFilterAvatarColor(newAvatarColor));
    dispatch(makeFilterGroup());
  };

  const changeFilterHasFriends = (newFilterFriends: string) => {
    dispatch(setFilterHasFriends(newFilterFriends));
    dispatch(makeFilterGroup());
  };

  if (groups.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h3>Фильтрация</h3>
      <div className={styles.filters}>
        <Select
          label={"Приватность"}
          options={typePrivateGroupOptions}
          value={typePrivate}
          onChange={changeFilterTypePrivateGroup}
        />
        <Select
          label={"Цвет"}
          options={avatarColorOptions}
          value={avatarColor}
          onChange={changeFilterAvatarColors}
        />
        <Select
          label={"Наличие друзей"}
          options={friendsOptions}
          value={friendsFilter}
          onChange={changeFilterHasFriends}
        />
      </div>
    </div>
  );
};

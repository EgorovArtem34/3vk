import { Filters, Group } from "./../components/Groups/model/types/index";

const filterByTypePrivate = (groups: Group[], typePrivate: string): Group[] => {
  switch (typePrivate) {
    case "open":
      return groups.filter((group) => {
        return !group.closed;
      });
    case "close":
      return groups.filter((group) => {
        return group.closed;
      });
    case "all":
    default:
      return groups;
  }
};

const filterByAvatarColor = (groups: Group[], color: string): Group[] =>
  color === "all"
    ? groups
    : groups.filter((group) => group.avatar_color === color);

const filterByFriends = (groups: Group[], friendsFilter: string): Group[] => {
  switch (friendsFilter) {
    case "yes":
      return groups.filter((group) => "friends" in group);
    case "no":
      return groups.filter((group) => !("friends" in group));
    case "all":
    default:
      return groups;
  }
};

export const filterGroup = (groups: Group[], filters: Filters) => {
  const { typePrivate, avatarColor, friendsFilter } = filters;
  let filteredGroups = groups;
  filteredGroups = filterByTypePrivate(filteredGroups, typePrivate);
  filteredGroups = filterByAvatarColor(filteredGroups, avatarColor);
  filteredGroups = filterByFriends(filteredGroups, friendsFilter);
  return filteredGroups;
};

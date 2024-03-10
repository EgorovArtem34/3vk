import { GroupList } from "@/components/Groups";
import { GroupFilters } from "@/components/Groups/GroupFilters/GroupFilters";

export const GroupsPage = () => {
  return (
    <div>
      <GroupFilters />
      <GroupList />
    </div>
  );
};

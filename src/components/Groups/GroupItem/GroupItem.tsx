import { Group } from "../model/types";
import styles from "./GroupItem.module.scss";
import { AvatarGroup } from "./AvatarGroup/AvatarGroup";
import { Friends } from "./Friends/Friends";

export const GroupItem = ({ group }: { group: Group }) => {
  const { name, closed, avatar_color, members_count, friends } = group;
  
  return (
    <div className={styles.group}>
      {avatar_color && <AvatarGroup bgColor={avatar_color} />}
      <div className={styles.info}>
        {name && (
          <p>
            <span>Имя группы: </span>
            {name}
          </p>
        )}
        {members_count && (
          <p>
            <span>Подписчики: </span>
            {members_count}
          </p>
        )}
        <p>{`${closed ? "Закрытая" : "Открытая"} группа`}</p>
        {friends && <Friends friends={friends} />}
      </div>
    </div>
  );
};

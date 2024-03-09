import { useState } from "react";
import { Button } from "@/ui/Button/Button";
import { User } from "../../model/types";
import styles from "./Friends.module.scss";

export const Friends = ({ friends }: { friends: User[] }) => {
  const [isShowFriends, setIsShowFriends] = useState(false);

  const handleShowFriends = () => {
    setIsShowFriends((prev) => !prev);
  };

  return (
    <div className={styles.friends}>
      <Button onClick={handleShowFriends} className={styles.friendsBtn}>
        <span>Количество друзей: </span>
        {friends.length}
      </Button>
      {isShowFriends && (
        <div className={styles.friendNames}>
          {friends.map((friend, i) => (
            <span key={`${i}${friend.first_name}`}>
              {`${friend.first_name} ${friend.last_name}${
                i === friends.length - 1 ? "" : ","
              }`}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

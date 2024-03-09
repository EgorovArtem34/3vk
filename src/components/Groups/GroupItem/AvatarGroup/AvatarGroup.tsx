import styles from "./AvatarGroup.module.scss";

export const AvatarGroup = ({ bgColor = "#0ff" }) => {
  return <div className={styles.avatar} style={{ backgroundColor: bgColor }} />;
};

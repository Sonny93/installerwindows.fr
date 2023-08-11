import Image from "next/image";
import styles from "./avatar.module.scss";

export default function Avatar({
  src,
  size = 24,
  username,
}: {
  src: string;
  size?: number;
  username: string;
}) {
  return (
    <div className={styles["avatar-wrapper"]}>
      <Image
        height={size}
        width={size}
        src={src}
        alt={`${username}'s avatar`}
        title={username}
      />
    </div>
  );
}

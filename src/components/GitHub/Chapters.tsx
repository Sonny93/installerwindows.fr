import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FaInfo, FaInfoCircle } from "react-icons/fa";

import styles from "./markdown.module.scss";

interface ChaptersProps {
  chapters: Chapter[];
  onSelect?: (event: any, chapter: Chapter) => void;
}
export default function Chapters({ chapters, onSelect }: ChaptersProps) {
  const [chapterVisible, setChapterVisible] = useState<Chapter[]>(undefined);

  const handleSetChaptersVisible = useCallback(() => {
    const chapterVisible = chapters.filter(({ id }) => {
      const top = document.getElementById(id)?.getBoundingClientRect().top;
      return top >= 0 && top <= window.innerHeight;
    });
    if (chapterVisible.length > 0) {
      setChapterVisible(chapterVisible);
    }
  }, [chapters]);

  useEffect(() => {
    handleSetChaptersVisible();
    window.addEventListener("scroll", handleSetChaptersVisible);
    window.addEventListener("resize", handleSetChaptersVisible);
    return () => {
      window.removeEventListener("scroll", handleSetChaptersVisible);
      window.removeEventListener("resize", handleSetChaptersVisible);
    };
  }, [chapters, handleSetChaptersVisible]);

  return (
    <ul className={styles["chapters"]}>
      <li className={styles["info"]}>
        Les chapitres en surbrillance sont les chapitres visibles sur votre
        écran.
        <FaInfoCircle />
      </li>
      <hr />
      {chapters.map((chapter) => (
        <Chapter
          chapter={chapter}
          onSelect={onSelect}
          key={chapter.id}
          visible={!!chapterVisible?.find(({ id }) => id === chapter.id)}
        />
      ))}
    </ul>
  );
}

function Chapter({
  chapter,
  onSelect,
  visible,
}: {
  chapter: Chapter;
  onSelect: ChaptersProps["onSelect"];
  visible: boolean;
}) {
  const { id, name } = chapter;
  return (
    <li className={styles["chapter"]}>
      <Link
        href={`#${id}`}
        className={`reset ${visible ? styles["chapter-active"] : ""}`}
        onClick={(event) => onSelect && onSelect(event, { id, name })}
        title={name}
      >
        {name}
      </Link>
    </li>
  );
}

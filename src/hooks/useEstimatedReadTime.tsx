import { useMemo } from "react";

export default function useEstimatedReadTime(text: string) {
  const contentSplitted = useMemo<string[]>(
    () =>
      text.replaceAll("\n", " ").replaceAll("\r", " ").split(" "),
    [text]
  );
  const wordCount = useMemo<number>(
    () => contentSplitted.length,
    [contentSplitted.length]
  );

  return Math.round(wordCount / 225)
}

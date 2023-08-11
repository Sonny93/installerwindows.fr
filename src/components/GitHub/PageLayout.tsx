import { NextSeo } from "next-seo";

import Footer from "components/Footer/Footer";
import Navbar from "components/Navbar/Navbar";
import Markdown from "./Markdown";
import NoMarkdown from "./NoMarkdown";

import styles from "styles/markdown.module.scss";

export default function MarkdownPage({
  content,
  url,
  urlRaw,
  pageTitle = undefined,
  pageDescription = undefined,
  disableChapters,
}: {
  content: string;
  url?: string;
  urlRaw?: string;
  pageTitle?: string;
  pageDescription?: string;
  disableChapters?: boolean;
}) {
  return (
    <>
      {(pageTitle || pageDescription) && (
        <NextSeo title={pageTitle} description={pageDescription} />
      )}
      <div className={styles["App"]}>
        <Navbar />
        {content ? (
          <Markdown
            markdown={content}
            innerClassName={styles["markdown-gh"]}
            disableChapters={disableChapters}
            source={url}
            raw={urlRaw}
          />
        ) : (
          <NoMarkdown />
        )}
        <Footer />
      </div>
    </>
  );
}

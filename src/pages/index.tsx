import MarkdownPage from "components/GitHub/PageLayout";
import { downloadMarkdown } from "utils";

const MARKDOWN_URL: string =
  "https://github.com/Piwielle/windows_11/blob/main/README.md";
const MARKDOWN_URL_RAW: string =
  "https://raw.githubusercontent.com/Piwielle/windows_11/master/README.md";

export default function Home({ markdown }: { markdown: string }) {
  return (
    <MarkdownPage
      content={markdown}
      url={MARKDOWN_URL}
      urlRaw={MARKDOWN_URL_RAW}
      disableChapters={true}
    />
  );
}

export async function getServerSideProps() {
  return {
    props: {
      markdown: await downloadMarkdown(MARKDOWN_URL_RAW),
    },
  };
}

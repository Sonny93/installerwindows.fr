import Modal from 'components/Modal/Modal';
import useModal from 'components/Modal/useModal';
import useEstimatedReadTime from 'hooks/useEstimatedReadTime';
import { useCallback, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { pluralize } from 'utils/string';
import Chapters from './Chapters';
import MarkdownImage from './MarkdownElements/MarkdownImage';
import MarkdownLink from './MarkdownElements/MarkdownLink';
import MarkdownTitle from './MarkdownElements/MarkdownTitle';
import Source from './Source';
import styles from './markdown.module.scss';

interface MarkdownProps {
  markdown: string;
  innerClassName?: string;
  disableChapters?: boolean;
  source: string;
  raw: string;
}
export default function Markdown({
  markdown,
  innerClassName,
  disableChapters,
  source,
  raw,
}: MarkdownProps) {
  const { isShowing, toggle, close: closeModal } = useModal();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const readTimeEstimation = useEstimatedReadTime(markdown);

  const addChapter = (newChapter: Chapter) => {
    setChapters((chapters) => {
      const chapter = chapters.find((c) => c.id === newChapter.id);
      return chapter ? chapters : [...chapters, newChapter];
    });
  };
  const handleResize = useCallback(() => {
    if (window.matchMedia('(min-width: 900px)').matches && isShowing) {
      closeModal();
    }
  }, [closeModal, isShowing]);

  const MarkdownTitleBuilder = (args) => <MarkdownTitle addChapter={addChapter} {...args} />;

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <div className={styles['page-wrapper']}>
      {chapters.length > 0 && !disableChapters && (
        <>
          <div className={styles['chapters-wrapper-desktop']}>
            <Chapters chapters={chapters} onSelect={closeModal} />
          </div>
          <div className={styles['chapters-wrapper-mobile']}>
            <button className="reset" onClick={toggle}>
              Voir les chapitres
            </button>
            <Modal isShowing={isShowing} hide={toggle} header="Chapitres">
              <Chapters chapters={chapters} onSelect={closeModal} />
            </Modal>
          </div>
        </>
      )}
      <div className={styles['markdown-content']}>
        <p style={{ fontSize: '.85em', marginTop: '20px' }}>
          Estimation temps de lecture : ~{pluralize('minute', readTimeEstimation)}
        </p>
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            a: MarkdownLink,
            img: MarkdownImage,
            h1: MarkdownTitleBuilder,
            h2: MarkdownTitleBuilder,
          }}
          className={innerClassName}
        >
          {markdown}
        </ReactMarkdown>
        <Source url={source} raw={raw} />
      </div>
    </div>
  );
}

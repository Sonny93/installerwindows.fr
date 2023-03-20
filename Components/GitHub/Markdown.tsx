import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import MarkdownLink from './MarkdownElements/MarkdownLink';
import MarkdownImage from './MarkdownElements/MarkdownImage';
import MarkdownTitle from './MarkdownElements/MarkdownTitle';

import Modal from '../Modal/Modal';
import useModal from '../Modal/useModal';
import Chapters from './Chapters';

import styles from './markdown.module.scss';

interface MarkdownProps {
    markdown: string;
    innerClassName?: string;
    disableChapters?: boolean;
}
export default function Markdown({ markdown, innerClassName, disableChapters }: MarkdownProps) {
    const { isShowing, toggle, close: closeModal } = useModal();
    const [chapters, setChapters] = useState<Chapter[]>([]);

    const addChapter = (newChapter: Chapter) => {
        setChapters((chapters) => {
            const chapter = chapters.find((c) => c.id === newChapter.id);
            return chapter ? chapters : [...chapters, newChapter];
        });
    };

    const MarkdownTitleBuilder = (args) => <MarkdownTitle addChapter={addChapter} {...args} />;

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
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    linkTarget="_blank"
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
            </div>
        </div>
    );
}

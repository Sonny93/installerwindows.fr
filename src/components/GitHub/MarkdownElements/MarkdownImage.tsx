import Modal from 'components/Modal/Modal';
import useToggle from 'hooks/useToggle';
import { ClassAttributes, ImgHTMLAttributes } from 'react';
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types';

type CustomImgComponentsProps = ClassAttributes<HTMLImageElement> &
  ImgHTMLAttributes<HTMLImageElement> &
  ReactMarkdownProps;

export default function MarkdownImage({
  src,
  id,
  className,
  alt = 'Logo',
}: CustomImgComponentsProps) {
  const { toggled, close, toggle } = useToggle();

  let props = {
    style: { verticalAlign: 'middle', marginRight: '0', height: 'auto', maxWidth: '100%' },
    className,
    src,
    alt,
    id,
  } as ImgHTMLAttributes<HTMLImageElement>;

  if (className === 'img-logo-discord' || className === 'img-logo-ytb') {
    props = {
      ...props,
      style: {
        verticalAlign: 'middle',
        marginRight: '2px',
        height: '25px',
        width: className === 'img-logo-discord' ? '25px' : '35px',
      },
      alt: alt || (className === 'img-logo-discord' ? 'Logo Discord' : 'Logo YouTube'),
    };

    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...props} alt={props.alt} className="image-hover" onClick={() => toggle(true)} />
      <Modal isShowing={toggled} hide={close} footer={props.alt} noHeightLimit>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img {...props} alt={props.alt} />
      </Modal>
    </>
  );
}

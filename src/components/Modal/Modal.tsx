import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

import styles from './modal.module.scss';

interface ModalProps {
  header?: ReactNode;
  isShowing: boolean;
  hide: () => void;
  children: ReactNode;
  footer?: ReactNode;
  noHeightLimit?: boolean;
}
export default function Modal({
  isShowing,
  hide,
  header,
  children,
  footer,
  noHeightLimit = false,
}: ModalProps) {
  const handleWrapperClick = ({ target }) =>
    (target.classList?.[0] === styles['modal-wrapper'] ||
      target.classList?.[0] === styles['modal-close-button']) &&
    hide();

  useEffect(() => {
    if (isShowing) {
      document.body.classList.add('lock-scroll');
    } else {
      document.body.classList.remove('lock-scroll');
    }

    const handleEscapeKey = ({ key }) => (key === 'Escape' ? hide() : undefined);
    document.addEventListener('keydown', handleEscapeKey, false);
    return () => document.addEventListener('keydown', handleEscapeKey, false);
  }, [hide, isShowing]);

  return isShowing ? (
    ReactDOM.createPortal(
      <div className={styles['modal-overlay']} onClick={handleWrapperClick}>
        <div className={styles['modal-wrapper']}>
          <div className={styles['modal']} style={noHeightLimit ? { maxHeight: 'unset' } : {}}>
            {header && (
              <div className={styles['modal-header']}>
                <h2>{header}</h2>
                <button
                  type="button"
                  className={`reset ${styles['modal-close-button']}`}
                  onClick={hide}
                >
                  <span>&times;</span>
                </button>
              </div>
            )}
            <div className={styles['modal-body']}>{children}</div>
            {footer && <div className={styles['modal-footer']}>{footer}</div>}
          </div>
        </div>
      </div>,
      document.body
    )
  ) : (
    <></>
  );
}

import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import styles from './modal.module.scss';

interface ModalProps {
    header: ReactNode;
    isShowing: boolean;
    hide: () => void;
    children: ReactNode;
}
const Modal = ({ isShowing, hide, header, children }: ModalProps) =>
    isShowing
        ? ReactDOM.createPortal(
              <div className={styles['modal-overlay']}>
                  <div className={styles['modal-wrapper']}>
                      <div className={styles['modal']}>
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
                          <div className={styles['modal-body']}>{children}</div>
                      </div>
                  </div>
              </div>,
              document.body
          )
        : null;

export default Modal;

'use client';

import React, { FC, ReactNode, useContext } from 'react';
import { ErrorModalContext } from './ErrorModalProvider';
import * as styles from './style.css';

const ErrorModalBoundary: FC<{ children: ReactNode }> = ({ children }) => {
  const { error, clearError } = useContext(ErrorModalContext);

  if (error) {
    return (
      <>
        <div className={styles.overlay} onClick={clearError}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>에러가 발생했어요</h2>
            <p className={styles.modalMessage}>
              [{error.domain}] {error.apiMessage}
            </p>
            <button className={styles.closeButton} onClick={clearError}>
              확인
            </button>
          </div>
        </div>
        {children}
      </>
    );
  }

  return <>{children}</>;
};

export default ErrorModalBoundary;

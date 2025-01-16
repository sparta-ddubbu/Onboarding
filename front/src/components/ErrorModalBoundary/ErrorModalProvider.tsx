'use client';

import { BusinessError } from '@/apis/client/axios';
import React, { createContext, useState, ReactNode, FC, useCallback } from 'react';

interface ServerErrorContextProps {
  error: BusinessError | null;
  throwError: (error: BusinessError) => void;
  clearError: () => void;
}

export const ErrorModalContext = createContext<ServerErrorContextProps>({
  error: null,
  throwError: () => {},
  clearError: () => {},
});

export const ErrorModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [error, setError] = useState<BusinessError | null>(null);

  const throwError = useCallback((error: BusinessError) => {
    setError(error);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return <ErrorModalContext.Provider value={{ error, throwError, clearError }}>{children}</ErrorModalContext.Provider>;
};

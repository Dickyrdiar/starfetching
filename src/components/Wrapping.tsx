import React from 'react';
import { ApiProvider } from "../context/apiContext";
import { WrappingComponentProps } from "../types/Wrapping";

const WrappingComponent: React.FC<WrappingComponentProps> = ({ children }) => {
  return (
    <ApiProvider>
      {children}
    </ApiProvider>
  );
}

export default WrappingComponent;
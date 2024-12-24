import React, { ReactNode } from 'react';
import { ApiProvider } from "./context/apiContext";
import { WrappingComponentProps } from "./types/Wrapping";

const WrappingComponent = ({ children }: WrappingComponentProps) => {
  return (
    <div className="wrapping-component">
      <ApiProvider>
        {children}
      </ApiProvider>
    </div>
  );
}

export default WrappingComponent;
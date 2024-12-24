import React from 'react';
import { ApiProvider } from "./context/apiContext";
import { WrappingComponentProps } from "./types/Wrapping";

const WrappingComponent: React.FC<WrappingComponentProps> = ({ children }) => {
  return (
    <div className="wrapping-component">
      <ApiProvider>
        {children}
      </ApiProvider>
    </div>
  );
}

export default WrappingComponent;
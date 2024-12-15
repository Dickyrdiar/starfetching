import React from "react"
import { WrappingProps } from "./types/Wrapping"

const WrappingComponent: React.FC<WrappingProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default WrappingComponent
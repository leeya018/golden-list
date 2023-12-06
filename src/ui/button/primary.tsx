import React, { FC, useState } from "react"
import Button from "."

type ButtonPropType = {
  children: React.ReactNode
  onClick: (param: any) => void
  className: string
}

const Primary: FC<ButtonPropType> = ({ children, className, ...rest }) => {
  return (
    <Button
      {...rest}
      className={`  border-color-blue border-2 bg-color-blue text-color-white rounded-md py-2 px-4 cursor-pointer ${className}`}
    >
      {children}
    </Button>
  )
}

export default Primary

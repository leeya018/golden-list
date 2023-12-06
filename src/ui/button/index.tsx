import React, { FC, useState } from "react"

type ButtonPropType = {
  children: React.ReactNode
  onClick: any
  className: string
}

const Button: FC<ButtonPropType> = ({ children, className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button

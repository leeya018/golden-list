import React, { FC } from "react"
import { InputPropType } from "./interfaces"

const Input: FC<InputPropType> = ({
  name,
  type,
  className,
  onChange,
  value,
  placeHolder,
  inputRef = null,
}) => {
  return (
    <input
      type={type}
      className={className}
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeHolder}
      ref={inputRef}
    />
  )
}
export default Input

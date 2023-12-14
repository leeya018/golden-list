import React, { FC } from "react"

type InputPropType = {
  checked: boolean
  name: string
  className: string
  type: string
}

const Input: FC<InputPropType> = ({ name, checked, className, type }) => {
  return (
    <input checked={checked} type={type} className={className} name={name} />
  )
}
export default Input

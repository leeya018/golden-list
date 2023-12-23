import { observer } from "mobx-react-lite"
import { WordGptProps } from "./hooks/interfaces"
import { FC, useEffect, useState } from "react"
import InputCheckbox from "@/ui/inputBox/checbox"

const WordGpt: FC<WordGptProps> = observer(({ word, checked, onChange }) => {
  return (
    <div
      className=" flex justify-center 
        items-center rounded-md border-2
        flex-col h-44 gap-2 p-2 "
    >
      <InputCheckbox checked={checked} onChange={() => onChange(word.name)} />
      <div className="text-lg font-bold"> {word.name}</div>
      <div> {word.translate}</div>
      <div> {word.type}</div>
    </div>
  )
})
export default WordGpt

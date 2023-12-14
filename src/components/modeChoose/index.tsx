import { observer } from "mobx-react-lite"
import { FC, useState, useEffect } from "react"

import { Word } from "@/api/words/interfaces"
import { WordsMode } from "@/util"
import { ModeChooseProps } from "./hooks/interfaces"
import InputRadio from "@/ui/input/radio"

const ModeChoose: FC<ModeChooseProps> = observer(({ mode, setMode }) => {
  return (
    <div
      className="my-3 w-full text-xl flex justify-center 
     items-center gap-5 p-2"
    >
      <label
        className="radio flex items-center gap-1 cursor-pointer"
        onClick={() => setMode(WordsMode.show)}
      >
        <InputRadio checked={WordsMode.show === mode} name={WordsMode.show} />
        {WordsMode.show}
      </label>
      <label
        className="radio flex items-center gap-1 cursor-pointer"
        onChange={() => setMode(WordsMode.test)}
      >
        <InputRadio checked={WordsMode.test === mode} name={WordsMode.test} />
        {WordsMode.test}
      </label>
    </div>
  )
})

export default ModeChoose

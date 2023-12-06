import { observer } from "mobx-react-lite"
import { FC, useState, useEffect } from "react"

import { Word } from "@/api/words/interfaces"
import { WordsMode } from "@/util"
import { ModeChooseProps } from "./hooks/interfaces"

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
        <input
          checked={WordsMode.show === mode}
          type="radio"
          className="w-5 h-5 cursor-pointer"
          name={WordsMode.show}
        />
        {WordsMode.show}
      </label>
      <label
        className="radio flex items-center gap-1 cursor-pointer"
        onChange={() => setMode(WordsMode.test)}
      >
        <input
          checked={WordsMode.test === mode}
          type="radio"
          name={WordsMode.test}
          className="w-5 h-5 cursor-pointer"
        />
        {WordsMode.test}
      </label>
    </div>
  )
})

export default ModeChoose

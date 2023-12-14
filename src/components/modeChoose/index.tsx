import { observer } from "mobx-react-lite"
import { FC, useState, useEffect } from "react"

import { Word } from "@/api/words/interfaces"
import { WordsMode } from "@/util"
import { ModeChooseProps } from "./hooks/interfaces"
import InputRadio from "@/ui/input/radio"
import LabelInputRadio from "@/ui/labelInput/radio"
import selectModeStore from "@/mobx/selectModeStore"

const ModeChoose: FC<ModeChooseProps> = observer(({}) => {
  const { mainMode, practiceMode, setMainMode } = selectModeStore

  return (
    <div
      className="my-3 w-full text-xl flex justify-center 
     items-center gap-5 p-2"
    >
      <LabelInputRadio onClick={() => setMainMode(WordsMode.show)}>
        <InputRadio
          checked={WordsMode.show === mainMode}
          name={WordsMode.show}
        />
        {WordsMode.show}
      </LabelInputRadio>
      <LabelInputRadio
        onClick={() => {
          setMainMode(WordsMode.practice)
        }}
      >
        <InputRadio
          checked={WordsMode.practice === mainMode}
          name={WordsMode.practice}
        />
        {WordsMode.practice}
      </LabelInputRadio>
      <LabelInputRadio onClick={() => setMainMode(WordsMode.test)}>
        <InputRadio
          checked={WordsMode.test === mainMode}
          name={WordsMode.test}
        />
        {WordsMode.test}
      </LabelInputRadio>
    </div>
  )
})

export default ModeChoose

import { observer } from "mobx-react-lite"
import { FC, useState, useEffect } from "react"

import { Word } from "@/api/words/interfaces"
import { WordsPracticeMode } from "@/util"
import { ModeChooseProps } from "./hooks/interfaces"
import InputRadio from "@/ui/inputBox/radio"
import LabelInputRadio from "@/ui/labelInput/radio"
import selectModeStore from "@/mobx/selectModeStore"

const ModeChoosePractice: FC<ModeChooseProps> = observer(() => {
  const { setPracticeMode, practiceMode } = selectModeStore

  return (
    <div
      className="my-3 w-full text-xl flex justify-center 
     items-center gap-5 p-2"
    >
      <></>
      <LabelInputRadio onClick={() => setPracticeMode(WordsPracticeMode.hover)}>
        <InputRadio
          checked={WordsPracticeMode.hover === practiceMode}
          name={WordsPracticeMode.hover}
        />
        {WordsPracticeMode.hover}
      </LabelInputRadio>
      <LabelInputRadio
        className="radio flex items-center gap-1 cursor-pointer"
        onClick={() => setPracticeMode(WordsPracticeMode.click)}
      >
        <InputRadio
          checked={WordsPracticeMode.click === practiceMode}
          name={WordsPracticeMode.click}
        />
        {WordsPracticeMode.click}
      </LabelInputRadio>
      <LabelInputRadio
        className="radio flex items-center gap-1 cursor-pointer"
        onClick={() => setPracticeMode(WordsPracticeMode.focus)}
      >
        <InputRadio
          checked={WordsPracticeMode.focus === practiceMode}
          name={WordsPracticeMode.focus}
        />
        {WordsPracticeMode.focus}
      </LabelInputRadio>
    </div>
  )
})

export default ModeChoosePractice

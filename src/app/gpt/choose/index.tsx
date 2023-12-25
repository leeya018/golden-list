import { observer } from "mobx-react-lite"
import { FC, useState, useEffect } from "react"
import InputRadio from "@/ui/inputBox/radio"
import LabelInputRadio from "@/ui/labelInput/radio"
import useGpt, { Modes } from "../hooks/useGpt"
import { GptChooseProps } from "../hooks/interfaces"

const GptChoose: FC<GptChooseProps> = observer(({ mode, setMode }) => {
  return (
    <div
      className="my-3 w-full text-xl flex justify-center 
     items-center gap-5 p-2"
    >
      <LabelInputRadio onClick={() => setMode(Modes.all)}>
        <InputRadio checked={Modes.all === mode} name={Modes.all} />
        {Modes.all}
      </LabelInputRadio>
      <LabelInputRadio
        onClick={() => {
          setMode(Modes.byOne)
        }}
      >
        <InputRadio checked={Modes.byOne === mode} name={Modes.byOne} />
        {Modes.byOne}
      </LabelInputRadio>
    </div>
  )
})

export default GptChoose

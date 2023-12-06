import { observer } from "mobx-react-lite"
import React, { FC, useState, useEffect } from "react"
import PrimaryButton from "@/ui/button/primary"
import { WordExamProps } from "./hooks/interfaces"

import { FcApproval } from "react-icons/fc"
import appStore from "@/mobx/appStore"
import examStore from "@/mobx/examStore"

const WordExam: FC<WordExamProps> = observer(({ word }) => {
  const [hints, setHints] = useState(0)
  const [isShowTranslate, setIsShowTranslate] = useState(false)
  const [myGuess, setMyGuess] = useState("")

  const isEqual = (trans1: string, trans2: string) => {
    return trans1.toLowerCase() === trans2.toLowerCase()
  }

  const handleChange = (e) => {
    setMyGuess(e.target.value)
  }

  const handleConfirm = () => {
    if (isEqual(myGuess, word.translate)) {
      examStore.increaseScore()
    }
    appStore.setWords(appStore.words.filter((w) => w.id !== word.id))
    setMyGuess("")
  }

  return (
    <div className="flex justify-center ">
      <div
        className="relative  
       flex flex-col items-center  justify-start
    border-2 rounded-md shadow-sm p-5 m-5"
      >
        <div
          className="flex items-center justify-center  
                  w-full  border-b-2 py-3 mb-2  font-bold text-2xl"
        >
          {word.name}
        </div>

        <div
          className="rounded-md mt-5 p-2  
           border-color-text-gray pl-2
            placeholder:text-color-hover-gray 
            font-semibold placeholder:pl-2 flex items-center justify-start w-full gap-3"
        >
          <input
            type="text"
            value={myGuess}
            onChange={handleChange}
            placeholder="Enter Translation"
            className="border-2
             rounded-md outline-none py-3  focus:border-color-blue  pl-2"
          />
        </div>

        <div
          className="rounded-md mt-5 p-2  
           border-color-text-gray pl-2
            placeholder:text-color-hover-gray 
            font-semibold placeholder:pl-2 flex justify-start w-full items-center"
        >
          <span className="pr-2">Typing : </span> <div> {word.type}</div>
        </div>
        <PrimaryButton onClick={handleConfirm} className=" top-1 right-1 ">
          Confirm
        </PrimaryButton>
      </div>
    </div>
  )
})

export default WordExam

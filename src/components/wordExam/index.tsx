import { observer } from "mobx-react-lite"
import React, { FC, useState, useEffect } from "react"
import PrimaryButton from "@/ui/button/primary"
import { WordExamProps } from "./hooks/interfaces"
import appStore from "@/mobx/appStore"
import examStore from "@/mobx/examStore"
import { FcApproval, FcDisapprove } from "react-icons/fc"
import { Word } from "@/api/words/interfaces"
import { Timestamp } from "firebase/firestore"
import { isSameDay } from "@/util"

const WordExam: FC<WordExamProps> = observer(({ word, setIsSaved }) => {
  const [myGuess, setMyGuess] = useState<string>("")

  const isEqual = (trans1: string, trans2: string) => {
    return trans1.toLowerCase() === trans2.toLowerCase()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyGuess(e.target.value)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code == "Enter") {
      handleConfirm()
    }
  }

  const handleConfirm = () => {
    if (!myGuess) return
    if (isEqual(myGuess, word.translate)) {
      examStore.increaseCorrect()
      appStore.editLocalWord(word, true)
    } else {
      examStore.increaseMistake()
      appStore.editLocalWord(word, false)
    }
    setIsSaved(false)
  }
  const isLock = (word: Word) => {
    if (!word.examResults) return false
    const lastInd = (word.examResults || []).length - 1
    if (lastInd < -1) return false
    const lastItem = word.examResults[lastInd]
    if (!lastItem) return false
    if (isSameDay(lastItem.date, Timestamp.now())) {
      return true
    }
    return false
  }
  const getStatusAns = (word: Word) => {
    if (!word.examResults) return 0
    const lastInd = (word.examResults || []).length - 1
    if (lastInd < -1) return 0
    const lastItem = word.examResults[lastInd]
    if (!lastItem) return 0

    if (isSameDay(lastItem.date, Timestamp.now())) {
      if (lastItem.isSuccess) return 1
      return -1
    }
    return 0
  }
  const isLocked = isLock(word)
  // 1 success -1 false ,0 - not ans
  const statusAns = getStatusAns(word)

  return (
    <div className="flex justify-center  ">
      <div
        className="relative  w-full
        flex flex-col items-center  justify-start
        border-2 rounded-md shadow-sm p-5 m-5"
      >
        <div
          className="flex  items-center justify-center  
          w-full  border-b-2 py-3 mb-2  font-bold text-2xl"
        >
          {word.name}

          {statusAns === 1 && (
            <FcApproval className="absolute top-1 right-1" size={40} />
          )}
          {statusAns === -1 && (
            <FcDisapprove className="absolute top-1 right-1" size={40} />
          )}
        </div>

        <div
          className="rounded-md mt-5 p-2  
           border-color-text-gray pl-2
            placeholder:text-color-hover-gray 
            font-semibold placeholder:pl-2 flex items-center justify-start w-full gap-3"
        >
          {statusAns === 0 && (
            <input
              disabled={isLocked}
              type="text"
              value={myGuess}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter Translation"
              className={`border-2
            rounded-md outline-none py-3  focus:border-color-blue  pl-2 ${
              isLocked ? "bg-color-gray select-none" : ""
            }`}
            />
          )}
        </div>
        <div
          className={`${
            statusAns !== 0 ? "visible" : "invisible"
          } text-color-green font-semibold text-xl`}
        >
          {word.translate}
        </div>

        <div
          className="rounded-md mt-5 p-2  
           border-color-text-gray pl-2
            placeholder:text-color-hover-gray 
            font-semibold placeholder:pl-2 flex justify-start w-full items-center"
        >
          <span className="pr-2">Typing : </span> <div> {word.type}</div>
        </div>
        {!isLocked && (
          <PrimaryButton
            onClick={handleConfirm}
            className={`top-1 right-1 `}
            disabled={!myGuess}
          >
            Confirm
          </PrimaryButton>
        )}
      </div>
    </div>
  )
})

export default WordExam

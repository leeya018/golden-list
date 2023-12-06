import { observer } from "mobx-react-lite"
import React, { FC, useState, useEffect } from "react"
import PrimaryButton from "@/ui/button/primary"
import { WordExamProps } from "./hooks/interfaces"
import appStore from "@/mobx/appStore"
import examStore from "@/mobx/examStore"
import { FcApproval, FcDisapprove } from "react-icons/fc"

const WordExam: FC<WordExamProps> = observer(({ word }) => {
  const [myGuess, setMyGuess] = useState<string>("")

  const [success, setSuccess] = useState<number>(0) // 0- none  1 - success -1 - fail
  const [isLock, setIsLock] = useState<boolean>(false)

  const isEqual = (trans1: string, trans2: string) => {
    return trans1.toLowerCase() === trans2.toLowerCase()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyGuess(e.target.value)
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.code)
    if (e.code == "Enter") {
      handleConfirm()
    }
  }

  const handleConfirm = () => {
    if (!myGuess) return
    if (isEqual(myGuess, word.translate)) {
      examStore.increaseCorrect()
      setSuccess(1)
    } else {
      examStore.increaseMistake()
      setSuccess(-1)
    }
    setIsLock(true)
  }

  return (
    <div className="flex justify-center ">
      <div
        className="relative  
       flex flex-col items-center  justify-start
    border-2 rounded-md shadow-sm p-5 m-5"
      >
        <div
          className="flex  items-center justify-center  
                  w-full  border-b-2 py-3 mb-2  font-bold text-2xl"
        >
          {word.name}

          {success === 1 && (
            <FcApproval className="absolute top-1 right-1" size={40} />
          )}
          {success === -1 && (
            <FcDisapprove className="absolute top-1 right-1" size={40} />
          )}
        </div>

        <div
          className="rounded-md mt-5 p-2  
           border-color-text-gray pl-2
            placeholder:text-color-hover-gray 
            font-semibold placeholder:pl-2 flex items-center justify-start w-full gap-3"
        >
          <input
            disabled={isLock}
            type="text"
            value={myGuess}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter Translation"
            className={`border-2
            rounded-md outline-none py-3  focus:border-color-blue  pl-2 ${
              isLock ? "bg-color-gray select-none" : ""
            }`}
          />
        </div>
        <div
          className={`${
            success === -1 ? "visible" : "invisible"
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
        {!isLock && (
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

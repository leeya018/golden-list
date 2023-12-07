import { observer } from "mobx-react-lite"
import React, { FC, useState, useEffect } from "react"
import PrimaryButton from "@/ui/button/primary"
import { WordTestProps } from "./hooks/interfaces"

import { FcApproval } from "react-icons/fc"
import appStore from "@/mobx/appStore"

const LIM_HINTS = 2
const WordTest: FC = observer(({}) => {
  const [hints, setHints] = useState(0)
  const [isShowTranslate, setIsShowTranslate] = useState(false)
  const [myGuess, setMyGuess] = useState("")

  useEffect(() => {
    setHints(0)
    setIsShowTranslate(false)
    setMyGuess("")
  }, [appStore.chosenWord?.id])

  useEffect(() => {
    if (isEqual(myGuess, appStore.chosenWord?.translate as string)) {
      const updatedWords = appStore.words.map((w) => {
        if (appStore.chosenWord?.id === w.id) {
          return { ...w, knows: w.knows + 1 }
        }
        return w
      })
      console.log({ updatedWords })

      appStore.setWords(updatedWords)
    }
  }, [myGuess])

  const isEqual = (t1: string, t2: string) => {
    return t1.toLocaleLowerCase() === t2.toLowerCase()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyGuess(e.target.value)
  }
  const updateHints = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHints((prev) => {
      if (prev + 1 <= LIM_HINTS) {
        return prev + 1
      }
      return prev
    })
  }

  const isLimHints = () => {
    return hints === LIM_HINTS
  }
  return (
    <div className="w-3/4  flex justify-center ">
      <div
        className="relative  w-[80%] h-[30rem]
       flex flex-col items-center  justify-start
    border-2 rounded-md shadow-sm p-5 m-5"
      >
        {isEqual(myGuess, appStore.chosenWord?.translate as string) && (
          <FcApproval className="absolute bottom-1 right-1" size={85} />
        )}

        <div
          className="flex items-center justify-between  
        w-full  border-b-2 py-3 mb-2 "
        >
          <PrimaryButton
            onClick={updateHints}
            disabled={isLimHints()}
            className={`top-1 right-1`}
          >
            Hint me
          </PrimaryButton>

          <div className="font-bold text-2xl">{appStore.chosenWord?.name}</div>
          <div className=" top-1 left-1">hints:({hints})</div>
        </div>
        <div
          className="rounded-md mt-5 p-2  
           border-color-text-gray pl-2
            placeholder:text-color-hover-gray 
            font-semibold placeholder:pl-2 flex items-center justify-start w-full gap-3"
        >
          <span>Tranlation</span>:{" "}
          <input
            type="text"
            value={myGuess}
            onChange={handleChange}
            placeholder="Enter Translation"
            className="border-2 rounded-md outline-none py-3 focus:ring-color-blue pl-2"
          />
          <PrimaryButton
            onClick={() => setIsShowTranslate(true)}
            className=" top-1 right-1 "
          >
            Test
          </PrimaryButton>
          {isShowTranslate && (
            <div className="text-xl font-semibold text-color-green w-full  flex justify-center items-center ">
              {appStore.chosenWord?.translate}{" "}
            </div>
          )}
        </div>

        <div
          className="rounded-md mt-5 p-2  
           border-color-text-gray pl-2
            placeholder:text-color-hover-gray 
            font-semibold placeholder:pl-2 flex justify-start w-full items-center"
        >
          <span className="pr-2">Typeing : </span>{" "}
          {hints > 0 && <div> {appStore.chosenWord?.type}</div>}
        </div>
        <div
          className="rounded-md mt-8 p-2  
           border-color-text-gray pl-2
            placeholder:text-color-hover-gray 
            font-semibold placeholder:pl-2 flex justify-start w-full items-center"
        >
          <span className="pr-2">Hint : </span>{" "}
          {hints > 1 && <div> {appStore.chosenWord?.hint}</div>}
        </div>
      </div>
    </div>
  )
})

export default WordTest

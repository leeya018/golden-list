"use client"

import PrimaryButton from "@/ui/button/primary"

import PrimaryInput from "@/ui/input/primary"
import InputCheckbox from "@/ui/inputBox/checbox"
import { FC } from "react"
import WordGpt from "../word"
import { AllWordsGptProps } from "../hooks/interfaces"
import { observer } from "mobx-react-lite"
import useGpt from "../hooks/useGpt"
import axios from "axios"
import { Language, getUrl, parseJSON } from "@/util"
import appStore from "@/mobx/appStore"
import gptStore from "@/mobx/gptStore"

const AllWordsGpt: FC<AllWordsGptProps> = observer(
  ({
    chosenWords,
    addIsChecked,
    addWords,
    setGptWords,
    wordsAmount,
    setWordsAmount,
  }) => {
    const askGpt = async () => {
      const wordsAns = await gptStore.askGptAllWordsApi(wordsAmount)
      const wordsAnsWithChecked = addIsChecked(wordsAns)
      setGptWords(wordsAnsWithChecked)
    }

    return (
      <div className="flex flex-col items-start gap-2  w-full">
        <div className="flex gap-2">
          <PrimaryInput
            className="w-24"
            type={"number"}
            onChange={(e: any) => setWordsAmount(parseInt(e.target.value))}
            value={wordsAmount}
            placeHolder={"wordsAmount"}
          />
          <PrimaryButton
            onClick={askGpt}
            className={`justify-normal`}
            disabled={wordsAmount <= 0}
          >
            get words
          </PrimaryButton>
          {chosenWords.length > 0 && (
            <PrimaryButton onClick={addWords} className={`justify-normal`}>
              add words
            </PrimaryButton>
          )}
        </div>
      </div>
    )
  }
)

export default AllWordsGpt

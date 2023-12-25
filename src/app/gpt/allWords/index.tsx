"use client"

import PrimaryButton from "@/ui/button/primary"

import PrimaryInput from "@/ui/input/primary"
import InputCheckbox from "@/ui/inputBox/checbox"
import { FC } from "react"
import WordGpt from "../word"
import { AllWordsGptProps } from "../hooks/interfaces"
import { observer } from "mobx-react-lite"

const AllWordsGpt: FC<AllWordsGptProps> = observer(
  ({
    gptWords,
    setWordsAmount,
    wordsAmount,
    getChosenWords,
    askGptApi,
    allChecked,
    handleSelectAll,
    addWords,
    handleCheck,
  }) => {
    return (
      <div className="flex flex-col items-start gap-2  w-full">
        <div className="flex gap-2">
          <PrimaryInput
            className="w-24"
            type={"number"}
            onChange={(e) => setWordsAmount(parseInt(e.target.value))}
            value={wordsAmount}
            placeHolder={"wordsAmount"}
          />
          <PrimaryButton
            onClick={askGptApi}
            className={`justify-normal`}
            disabled={wordsAmount <= 0}
          >
            get words
          </PrimaryButton>
          {getChosenWords().length > 0 && (
            <PrimaryButton onClick={addWords} className={`justify-normal`}>
              add words
            </PrimaryButton>
          )}
        </div>
        <div className="w-full h-screen flex flex-col justify-start  ">
          {gptWords.length > 0 && (
            <div>
              <label htmlFor="select all ">select all </label>
              <InputCheckbox checked={allChecked} onChange={handleSelectAll} />
            </div>
          )}
          <ul className="w-full grid grid-cols-6 h-44 gap-2">
            {gptWords.map((word, key) => (
              <li key={key}>
                <WordGpt
                  word={word}
                  checked={word.isChecked}
                  onChange={() => handleCheck(word.name)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
)

export default AllWordsGpt

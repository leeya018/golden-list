"use client"

import { FC, useEffect } from "react"
import PrimaryButton from "@/ui/button/primary"

import InputCheckbox from "@/ui/inputBox/checbox"
import WordGpt from "../word"
import { GptWordsProps } from "../hooks/interfaces"
import { observer } from "mobx-react-lite"
import useGpt from "../hooks/useGpt"

const GptWords: FC<GptWordsProps> = observer(
  ({ gptWords, allChecked, handleSelectAll, handleCheck }) => {
    console.log("gptWords")

    console.log("gptWords", gptWords)
    return (
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
                checked={word.isChecked || false}
                onChange={() => handleCheck(word.name)}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
)

export default GptWords

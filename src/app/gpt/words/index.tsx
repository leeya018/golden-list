"use client"

import { FC, useEffect, useState } from "react"
import PrimaryButton from "@/ui/button/primary"

import InputCheckbox from "@/ui/inputBox/checbox"
import WordGpt from "../word"
import { GptWordsProps } from "../hooks/interfaces"
import { observer } from "mobx-react-lite"
import useGpt from "../hooks/useGpt"

import Image from "next/image"
import gptStore from "@/mobx/gptStore"

const GptWords: FC<GptWordsProps> = observer(
  ({ gptWords, allChecked, handleSelectAll, handleCheck, setGptWords }) => {
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

              <PrimaryButton
                className=""
                onClick={async () => {
                  const url = await gptStore.getArticleImagesApi(word.translate)
                  if (!url) throw new Error("no url from iamge api")

                  const dupGptWords = gptWords.map((w) => {
                    if (word.name === w.name) {
                      word.imageUrl = url
                    }
                    return word
                  })

                  setGptWords(dupGptWords)
                }}
              >
                add Image
              </PrimaryButton>
              {word.imageUrl && (
                <Image
                  alt={`${word.translate} Image`}
                  width={150}
                  height={150}
                  className="rounded-lg "
                  src={word.imageUrl}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  }
)

export default GptWords

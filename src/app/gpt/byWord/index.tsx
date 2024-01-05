"use client"

import { FC, useState } from "react"
import PrimaryButton from "@/ui/button/primary"
import { FaRegTrashAlt } from "react-icons/fa"

import PrimaryInput from "@/ui/input/primary"
import { ByWordGptProps } from "../hooks/interfaces"
import { observer } from "mobx-react-lite"
import Title from "@/ui/title"
import appStore from "@/mobx/appStore"
import { Language, getUrl, parseJSON } from "@/util"
import axios from "axios"
import WordGpt from "../word"
import useGpt from "../hooks/useGpt"
import gptStore from "@/mobx/gptStore"

const ByWordGpt: FC<ByWordGptProps> = observer(
  ({ chosenWords, addWords, setGptWords, addIsChecked }) => {
    const [translate, setTranslate] = useState("")
    const [translateList, setTranslateList] = useState<string[]>([])

    const addWord = () => {
      setTranslateList((prev) => [...prev, translate])
      setTranslate("")
    }
    const removeItem = (trans: string) => {
      const newList = translateList.filter((t) => t !== trans)
      setTranslateList(newList)
    }

    const handleKeyDown = (e: any) => {
      if (e.code === "Enter") {
        addWord()
      }
    }

    const askGpt = async () => {
      const wordsAns = await gptStore.askGptByWordApi(translateList)
      const wordsAnsWithChecked = addIsChecked(wordsAns)
      setGptWords(wordsAnsWithChecked)
    }
    return (
      <div className="flex flex-col items-start gap-2  w-full">
        <Title>just choose the translation in English</Title>
        <PrimaryInput
          onKeyDown={handleKeyDown}
          className="w-24"
          type={"string"}
          onChange={(e: any) => setTranslate(e.target.value)}
          value={translate}
          placeHolder={"add word translate (english)"}
        />
        <PrimaryButton
          onClick={addWord}
          className={`justify-normal`}
          disabled={translate === ""}
        >
          add word
        </PrimaryButton>
        <PrimaryButton
          onClick={askGpt}
          className={`justify-normal`}
          disabled={translateList.length === 0}
        >
          Generate full words
        </PrimaryButton>
        {chosenWords.length > 0 && (
          <PrimaryButton onClick={addWords} className={`justify-normal`}>
            add words
          </PrimaryButton>
        )}

        <ul>
          {translateList.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <FaRegTrashAlt
                className="cursor-pointer hover:scale-105"
                onClick={() => removeItem(t)}
              />{" "}
              <div>{t}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
)

export default ByWordGpt

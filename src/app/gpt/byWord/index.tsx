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

const ByWordGpt: FC<ByWordGptProps> = observer(({}) => {
  const [translate, setTranslate] = useState("")
  const [translateList, setTranslateList] = useState([])

  const addWord = () => {
    setTranslateList((prev) => [...prev, translate])
    setTranslate("")
  }
  const removeItem = (trans: string) => {
    const newList = translateList.filter((t) => t !== trans)
    setTranslateList(newList)
  }
  const askGptApi = async () => {
    try {
      if (!appStore.chosenCategory?.name) throw new Error("categoryId is null")
      if (translateList.length === 0)
        throw new Error("translateList amount must be greater than 0")
      const translateListStr = translateList.join(",")
      const question = ` take this translateList : ${translateListStr} .
         from that translateList create a new array of wordsItems.
        each wordItem will have those fields:
            translate: (a word from the translateList ),
            name: (the word itself in the ${Language} language),
            type : (the way you should read the wordName in  english)
    I want you to return an array in js with those words items 
    (please return only the array - no code)
        `
      console.log("url   ", getUrl() + "/gpt")
      const res = await axios.post(
        getUrl() + "/gpt",
        { question },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      console.log(res.data)
      console.log(typeof res.data)

      const wordsAns: any[] = parseJSON(res.data)

      console.log(typeof wordsAns)
      console.log({ wordsAns })
    } catch (error) {
      console.error("Error fetching user:", error)
    }
  }

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      addWord()
    }
  }
  return (
    <div className="flex flex-col items-start gap-2  w-full">
      <Title>just choose the translation in English</Title>
      <PrimaryInput
        onKeyDown={handleKeyDown}
        className="w-24"
        type={"string"}
        onChange={(e) => setTranslate(e.target.value)}
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
        onClick={askGptApi}
        className={`justify-normal`}
        disabled={translateList.length === 0}
      >
        Generate full words
      </PrimaryButton>

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
})

export default ByWordGpt

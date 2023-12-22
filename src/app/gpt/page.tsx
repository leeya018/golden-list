"use client"

import { observer } from "mobx-react-lite"
import { FC, useState, useEffect, useRef } from "react"
import { FcApproval } from "react-icons/fc"
import Image from "next/image"
import { FaChevronLeft } from "react-icons/fa6"
import { FaChevronRight } from "react-icons/fa6"
import Nav from "@/components/nav"
import CategoryList from "@/components/categoryList"
import { Timestamp } from "firebase/firestore"
import { Category } from "@/api/categories/interfaces"
import { Word } from "@/api/words/interfaces"
import WordList from "@/components/wordList"
import PrimaryButton from "@/ui/button/primary"
import WordTest from "@/components/wordTest"
import ModeChoose from "@/components/modeChoose"
import { WordsMode, WordsPracticeMode, getUrl, modals } from "@/util"
import WordView from "@/components/wordView"
import appStore from "@/mobx/appStore"
import { UserAuth } from "@/context/AuthContext"
import * as API from "@/api/categories"
import Alerts from "@/ui/Alerts"
import { ModalStore } from "@/mobx/modalStore"
import AddModal from "@/ui/modal/word/add"
import Confetti from "@/ui/confetti"
import ModeChoosePractice from "@/components/modeChoose/practice"
import WordBoard from "@/components/wordBoard"
import selectModeStore from "@/mobx/selectModeStore"
import axios from "axios"
import { WordGptProps } from "./hooks/interfaces"
import InputCheckbox from "@/ui/inputBox/checbox"
import WordGpt from "./word"
import PrimaryInput from "@/ui/input/primary"

const data = [
  {
    name: "ресторан",
    translate: "restaurant",
    type: "res-ta-ran",
  },
  {
    name: "кафе",
    translate: "cafe",
    type: "ka-fe",
  },
  {
    name: "бар",
    translate: "bar",
    type: "bar",
  },
]
const GptPage = observer(() => {
  const { user } = UserAuth()
  const [gptWords, setGptWords] = useState([])
  const [wordsAmount, setWordsAmount] = useState(5)
  const [chosenGptWords, setChosenGptWords] = useState([])
  console.log(chosenGptWords)

  const addToChosen = (word: any) => {
    setChosenGptWords((prev) => [...prev, word])
  }
  const removeFromChosen = (w: any) => {
    const newWordsChosen = chosenGptWords.filter((word) => w.name !== word.name)
    setChosenGptWords(newWordsChosen)
  }
  const convertToArr = (jsonString: string) => {
    let array
    try {
      array = JSON.parse(
        jsonString
          .replace(/name/g, '"name"')
          .replace(/translate/g, '"translate"')
          .replace(/type/g, '"type"')
      )
      return array
    } catch (error) {
      console.log(error.message)
    }
  }

  const addWords = async () => {
    const categoryId = appStore.chosenCategory?.id || ""
    await appStore.addWords(user, categoryId, chosenGptWords)
    const filteredArr = gptWords.filter(
      (w1) => !appStore.words.some((w2) => w2.name === w1.name)
    )
    setGptWords(filteredArr)
    setChosenGptWords([])
  }

  const askGptApi = async () => {
    try {
      if (!appStore.chosenCategory?.name) throw new Error("categoryId is null")
      if (wordsAmount === 0)
        throw new Error("word amount must be greater than 0")
      const question = `
    Here are ${wordsAmount} common hebrew words related to the ${appStore.chosenCategory.name} category and put it in array with items :{
    name: (the word),
    translate: (the translation),
    type : (the way you should read it en english)
    }
    I want you to return an array in js with those words items 
    (please return only the array)
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

      console.log(res.data.message.content)
      console.log(typeof res.data.message.content)

      const wordsAns: any[] = convertToArr(res.data.message.content)

      console.log(typeof wordsAns)
      console.log({ wordsAns })
      setGptWords(wordsAns)

      return res
    } catch (error) {
      console.error("Error fetching user:", error)
    }
  }

  return (
    <div className="w-full h-[100vh] ">
      {/* alerts */}
      <Alerts />
      {/* nav */}

      <Nav />

      {/* categories */}
      <CategoryList />
      {/* words */}

      <div className="w-full h-screen flex justify-between">
        <WordList />

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
          </div>
          {chosenGptWords.length > 0 && (
            <PrimaryButton onClick={addWords} className={`justify-normal`}>
              add words
            </PrimaryButton>
          )}
          <div className="w-full h-screen flex justify-center  ">
            <ul className="w-full grid grid-cols-6 h-44">
              {gptWords.map((word, key) => (
                <li key={key}>
                  <WordGpt
                    word={word}
                    addToChosen={addToChosen}
                    removeFromChosen={removeFromChosen}
                    gptWords={gptWords}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
})

export default GptPage

"use client"

import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import Nav from "@/components/nav"
import CategoryList from "@/components/categoryList"
import WordList from "@/components/wordList"
import PrimaryButton from "@/ui/button/primary"
import { Language, getUrl, parseJSON } from "@/util"
import appStore from "@/mobx/appStore"
import { UserAuth } from "@/context/AuthContext"
import Alerts from "@/ui/Alerts"
import axios from "axios"
import WordGpt from "./word"
import PrimaryInput from "@/ui/input/primary"
import InputCheckbox from "@/ui/inputBox/checbox"
import GptChoose from "./choose"
import useGpt, { Modes } from "./hooks/useGpt"
import AllWordsGpt from "./allWords"
import ByWordGpt from "./byWord"
import GptWords from "./words"
import { Word } from "@/api/words/interfaces"

const GptPage = observer(() => {
  const {
    mode,
    setMode,
    user,
    gptWords,
    setGptWords,
    setWordsAmount,
    wordsAmount,
  } = useGpt()

  // const [chosenGptWords, setChosenGptWords] = useState([])

  // useEffect(() => {
  //   console.log({ mode })
  //   const ans = addIsChecked(gptWords)
  //   console.log(ans)
  //   setGptWords(ans)
  // }, [])
  // useEffect(() => {
  //   console.log({ gptWords })
  // }, [gptWords])

  const addIsChecked = (arr: any[]) => {
    return arr.map((item) => ({ ...item, isChecked: false }))
  }

  const addWords = async () => {
    const categoryId = appStore.chosenCategory?.id || ""
    const chosenWords = removeIsChecked(getChosenWords())
    await appStore.addWords(user, categoryId, chosenWords)
    const filteredArr = gptWords.filter(
      (w1) => !appStore.words.some((w2) => w2.name === w1.name)
    )
    setGptWords(filteredArr)
  }

  const getChosenWords = () => {
    return gptWords.filter((word) => word.isChecked === true)
  }
  const getNonChosenWords = () => {
    return gptWords.filter((word) => word.isChecked === false)
  }
  const removeIsChecked = (arr: any[]) => {
    return arr.map((word) => {
      delete word.isChecked
      return word
    })
  }

  const handleCheck = (name: string) => {
    const chosenWords = gptWords.map((item) => {
      if (item.name === name) {
        return { ...item, isChecked: !item.isChecked }
      }
      return item
    })
    setGptWords(chosenWords)
  }

  const handleSelectAll = () => {
    const chosenWords = gptWords.map((word) => ({
      ...word,
      isChecked: !allChecked,
    }))
    setGptWords(chosenWords)
  }

  const allChecked = gptWords.every((item) => item.isChecked)

  const chosenWords = getChosenWords()
  return (
    <div className="w-full h-[100vh] ">
      {/* alerts */}
      <Alerts />
      {/* nav */}

      <Nav />

      {/* categories */}
      <CategoryList />
      {/* words */}

      <GptChoose mode={mode} setMode={setMode} />
      <div className="w-full h-screen flex justify-between ">
        <WordList />
        <div className="flex flex-col w-full h-full">
          {mode === Modes.all && (
            <AllWordsGpt
              chosenWords={chosenWords}
              addIsChecked={addIsChecked}
              addWords={addWords}
              setGptWords={setGptWords}
              wordsAmount={wordsAmount}
              setWordsAmount={setWordsAmount}
            />
          )}
          {mode === Modes.byOne && (
            <ByWordGpt
              chosenWords={chosenWords}
              addIsChecked={addIsChecked}
              addWords={addWords}
              setGptWords={setGptWords}
            />
          )}
          <div className=" border-2 h-full w-full">
            <GptWords
              gptWords={gptWords}
              allChecked={allChecked}
              handleSelectAll={handleSelectAll}
              handleCheck={handleCheck}
            />
          </div>
        </div>
      </div>
    </div>
  )
})

export default GptPage

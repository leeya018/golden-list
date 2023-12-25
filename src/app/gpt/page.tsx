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

// const localGPT = [
//   {
//     name: "Kamusta",
//     translate: "Hello",
//     type: "kam-UH-sta",
//   },
//   {
//     name: "Magandang umaga",
//     translate: "Good morning",
//     type: "ma-gan-DANG oo-MA-ga",
//   },
//   {
//     name: "Magandang tanghali",
//     translate: "Good noon",
//     type: "ma-gan-DANG tang-HA-li",
//   },
//   {
//     name: "Magandang hapon",
//     translate: "Good afternoon",
//     type: "ma-gan-DANG ha-PON",
//   },
//   {
//     name: "Magandang gabi",
//     translate: "Good evening",
//     type: "ma-gan-DANG GA-bi",
//   },
//   {
//     name: "Paalam",
//     translate: "Goodbye",
//     type: "pa-A-LAM",
//   },
//   {
//     name: "Salamat",
//     translate: "Thank you",
//     type: "sa-LA-mat",
//   },
//   {
//     name: "Oo",
//     translate: "Yes",
//     type: "OO",
//   },
//   {
//     name: "Hindi",
//     translate: "No",
//     type: "HIN-di",
//   },
//   {
//     name: "Paki",
//     translate: "Please",
//     type: "PA-ki",
//   },
//   {
//     name: "Pasensiya",
//     translate: "Sorry",
//     type: "pa-SEN-si-ya",
//   },
//   {
//     name: "Ingat",
//     translate: "Take care",
//     type: "in-GAT",
//   },
//   {
//     name: "Tawagan mo ako",
//     translate: "Call me",
//     type: "ta-wa-GAN mo A-KO",
//   },
//   {
//     name: "Paano ka?",
//     translate: "How are you?",
//     type: "PA-an-o ka",
//   },
// ]
const GptPage = observer(() => {
  const { mode, setMode } = useGpt()
  const { user } = UserAuth()
  const [gptWords, setGptWords] = useState([])
  const [wordsAmount, setWordsAmount] = useState(5)
  // const [chosenGptWords, setChosenGptWords] = useState([])

  useEffect(() => {
    const a = addIsChecked(gptWords)
    console.log(a)
    setGptWords(a)
  }, [])

  useEffect(() => {
    console.log(gptWords)
  }, [gptWords])

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
  const removeIsChecked = () => {
    return gptWords.map((word) => {
      delete word.isChecked
      return word
    })
  }
  const askGptApi = async () => {
    try {
      if (!appStore.chosenCategory?.name) throw new Error("categoryId is null")
      if (wordsAmount === 0)
        throw new Error("word amount must be greater than 0")
      const question = `
    Here are ${wordsAmount} common 
    ${Language} words related to the ${appStore.chosenCategory.name} category and put it in array with items :{
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

      console.log(res.data)
      console.log(typeof res.data)

      const wordsAns: any[] = parseJSON(res.data)

      console.log(typeof wordsAns)
      console.log({ wordsAns })
      const wordsAnsWithChecked = addIsChecked(wordsAns)
      setGptWords(wordsAnsWithChecked)

      return res
    } catch (error) {
      console.error("Error fetching user:", error)
    }
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
      <div className="w-full h-screen flex justify-between">
        <WordList />
        {mode === Modes.all && (
          <AllWordsGpt
            gptWords={gptWords}
            setWordsAmount={setWordsAmount}
            wordsAmount={wordsAmount}
            getChosenWords={getChosenWords}
            askGptApi={askGptApi}
            allChecked={allChecked}
            handleSelectAll={handleSelectAll}
            addWords={addWords}
            handleCheck={handleCheck}
          />
        )}

        {mode === Modes.byOne && <ByWordGpt />}
      </div>
    </div>
  )
})

export default GptPage

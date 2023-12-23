"use client"

import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import Nav from "@/components/nav"
import CategoryList from "@/components/categoryList"
import WordList from "@/components/wordList"
import PrimaryButton from "@/ui/button/primary"
import { getUrl } from "@/util"
import appStore from "@/mobx/appStore"
import { UserAuth } from "@/context/AuthContext"
import Alerts from "@/ui/Alerts"
import axios from "axios"
import WordGpt from "./word"
import PrimaryInput from "@/ui/input/primary"
import InputCheckbox from "@/ui/inputBox/checbox"

const localGPT = [
  {
    name: "Kamusta",
    translate: "Hello",
    type: "kam-UH-sta",
  },
  {
    name: "Magandang umaga",
    translate: "Good morning",
    type: "ma-gan-DANG oo-MA-ga",
  },
  {
    name: "Magandang tanghali",
    translate: "Good noon",
    type: "ma-gan-DANG tang-HA-li",
  },
  {
    name: "Magandang hapon",
    translate: "Good afternoon",
    type: "ma-gan-DANG ha-PON",
  },
  {
    name: "Magandang gabi",
    translate: "Good evening",
    type: "ma-gan-DANG GA-bi",
  },
  {
    name: "Paalam",
    translate: "Goodbye",
    type: "pa-A-LAM",
  },
  {
    name: "Salamat",
    translate: "Thank you",
    type: "sa-LA-mat",
  },
  {
    name: "Oo",
    translate: "Yes",
    type: "OO",
  },
  {
    name: "Hindi",
    translate: "No",
    type: "HIN-di",
  },
  {
    name: "Paki",
    translate: "Please",
    type: "PA-ki",
  },
  {
    name: "Pasensiya",
    translate: "Sorry",
    type: "pa-SEN-si-ya",
  },
  {
    name: "Ingat",
    translate: "Take care",
    type: "in-GAT",
  },
  {
    name: "Tawagan mo ako",
    translate: "Call me",
    type: "ta-wa-GAN mo A-KO",
  },
  {
    name: "Paano ka?",
    translate: "How are you?",
    type: "PA-an-o ka",
  },
]
const GptPage = observer(() => {
  const { user } = UserAuth()
  const [gptWords, setGptWords] = useState([...localGPT])
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

  function parseJSON(jsonString: string) {
    try {
      return JSON.parse(jsonString)
    } catch (e) {
      console.error("Error parsing JSON:", e)
      return null // or return an empty object/array as a fallback
    }
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
    Here are ${wordsAmount} common filipino (Tagalo) words related to the ${appStore.chosenCategory.name} category and put it in array with items :{
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
                <InputCheckbox
                  checked={allChecked}
                  onChange={handleSelectAll}
                />
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
      </div>
    </div>
  )
})

export default GptPage

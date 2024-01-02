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

const AllWordsGpt: FC<AllWordsGptProps> = observer(
  ({
    chosenWords,
    addIsChecked,
    addWords,
    setGptWords,
    wordsAmount,
    setWordsAmount,
    setIsLoading,
  }) => {
    const askGptApi = async () => {
      try {
        setIsLoading(true)
        if (!appStore.chosenCategory?.name)
          throw new Error("categoryId is null")
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
    (please return only the array without any other explanation, and return the field names with double brackets. example: 
      [{
        "name": "...",
        "translate": "...",
        "type": "..."
        },...]
      )
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
        setIsLoading(false)

        return res
      } catch (error) {
        setIsLoading(false)
        console.error("Error fetching user:", error)
      }
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
            onClick={askGptApi}
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

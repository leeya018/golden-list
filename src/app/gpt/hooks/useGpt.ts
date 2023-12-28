import { UserAuth } from "@/context/AuthContext"
import appStore from "@/mobx/appStore"
import React, { useState, useEffect } from "react"

export const Modes: any = {
  all: "all",
  byOne: "byOne",
}
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
const useGpt = () => {
  const [mode, setMode] = useState(Modes.all)
  const { user } = UserAuth()
  const [gptWords, setGptWords] = useState([])
  const [wordsAmount, setWordsAmount] = useState(5)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setGptWords([])
  }, [appStore.chosenCategory])

  return {
    mode,
    setMode,
    user,
    gptWords,
    setGptWords,
    wordsAmount,
    setWordsAmount,
    isLoading,
    setIsLoading,
  }
}

export default useGpt

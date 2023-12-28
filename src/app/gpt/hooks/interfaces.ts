import { Word } from "@/api/words/interfaces"
import React from "react"

export type WordGptProps = {
  word: any
  removeFromChosen: any
  addToChosen: any
  gptWords: Word[]
}
export type GptChooseProps = {
  mode: boolean
  setMode: (mode: boolean) => void
}
export type AllWordsGptProps = {
  addIsChecked: (words: Word[]) => any
  getChosenWords: () => any
  addWords: () => void
  chosenWords: Word[]
  setGptWords: React.Dispatch<React.SetStateAction<Word[]>>
  wordsAmount: number
  setWordsAmount: React.Dispatch<React.SetStateAction<number>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}
export type ByWordGptProps = {
  addIsChecked: () => any
  addWords: () => void
  chosenWords: Word[]
  setGptWords: React.Dispatch<React.SetStateAction<Word[]>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}
export type GptWordsProps = {
  gptWords: Word[]
  handleCheck: (name: string) => void
  handleSelectAll: () => void
  allChecked: boolean
}

import { Word } from "@/api/words/interfaces"
import React from "react"

export type WordGptProps = {
  word: any
  checked: boolean
  onChange: (e: any) => void
}
export type GptChooseProps = {
  mode: boolean
  setMode: (mode: boolean) => void
}
export type AllWordsGptProps = {
  chosenWords: Word[]
  addIsChecked: (words: Word[]) => any
  addWords: () => void
  setGptWords: React.Dispatch<React.SetStateAction<Word[]>>
  wordsAmount: number
  setWordsAmount: React.Dispatch<React.SetStateAction<number>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}
export type ByWordGptProps = {
  addIsChecked: (words: Word[]) => any
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

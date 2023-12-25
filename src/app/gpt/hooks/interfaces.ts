import { Word } from "@/api/words/interfaces"

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
  // mode: string
  // setMode: (mode: string) => void
}
export type ByWordGptProps = {
  // mode: string
  // setMode: (mode: string) => void
}

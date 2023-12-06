import { Word } from "@/api/words/interfaces"

export type WordItemProps = {
  words: Word[]
  setChosenWord: (word: Word) => void
  chosenWord: Word
  setWords: (words: Word[]) => void
}
export type WordListItemProps = {
  word: Word
  setChosenWord: (word: Word) => void
  chosenWord: Word
}

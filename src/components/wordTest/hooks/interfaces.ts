import { Word } from "@/api/words/interfaces"

export type WordTestProps = {
  word: Word
  words: Word[]
  setWords: (words: Word[]) => void
}

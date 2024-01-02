import { Word } from "@/api/words/interfaces"

export type WordExamProps = {
  word: Word
  setIsSaved: (isSaved: boolean) => void
}

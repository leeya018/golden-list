import { Word } from "@/api/words/interfaces"
import React from "react"

export type TopBoardItemProps = {
  word: Word
  hints: number
  increaseHint: () => void
  setIsMyHint: React.Dispatch<React.SetStateAction<boolean>>
  isMyHint: boolean
}

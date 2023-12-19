import { Word } from "@/api/words/interfaces"
import React from "react"

export type WordPracticeItemProps = {
  word: Word
  onMouseLeave?: () => void
  onMouseEnter?: () => void
  onMouseUp?: () => void
  onMouseDown?: () => void
  onClick?: () => void
  isShowTop?: boolean
  isShow?: boolean
}
export type WordPracticeItemActionProps = {
  word: Word
}

import { Word } from "@/api/words/interfaces"
import React from "react"

export type WordPracticeItemProps = {
  word: Word
  onMouseLeave?: (e) => void
  onMouseEnter?: (e) => void
  onMouseUp?: (e) => void
  onMouseDown?: (e) => void
  onClick?: (e) => void
  isShowTop?: boolean
  isShow?: boolean
}
export type WordPracticeItemActionProps = {
  word: Word
}

import { Word } from "@/api/words/interfaces"
import React from "react"

export type WordPracticeItemProps = {
  word: Word
  onMouseLeave?: (e: any) => void
  onMouseEnter?: (e: any) => void
  onMouseUp?: (e: any) => void
  onMouseDown?: (e: any) => void
  onClick?: (e: any) => void
  isShowTop?: boolean
  isShow?: boolean
}
export type WordPracticeItemActionProps = {
  word: Word
}

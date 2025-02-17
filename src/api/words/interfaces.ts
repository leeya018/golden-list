import { Timestamp } from "firebase/firestore"

export type Word = {
  id?: string
  name: string
  translate: string
  type: string
  hint: string
  knows: number
  date?: Timestamp
  examResults?: Exam[]
  isChecked?: boolean
  imageUrl: string
}

export type Exam = {
  date: Timestamp
  isSuccess: boolean
}

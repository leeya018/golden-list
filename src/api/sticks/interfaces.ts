import { Timestamp } from "firebase/firestore"

export type CorrectItem = {
  isKnow: boolean
  date: Timestamp
}

export type Stick = {
  id: string
  name: string
  date: Timestamp
  answers: CorrectItem[]
}

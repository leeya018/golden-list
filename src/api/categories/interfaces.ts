import { Timestamp } from "firebase/firestore"

export type Category = {
  id: string
  name: string
  date: Timestamp
  bgColor: string
}

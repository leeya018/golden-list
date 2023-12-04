import {
  getDocs,
  collection,
  Timestamp,
  deleteDoc,
  doc,
  setDoc,
  addDoc,
  arrayUnion,
} from "firebase/firestore"
import { db } from "@/firebase"
import { Stick } from "./interfaces"

export const getSticks = async (user: any, categoryId: string) => {
  const sticksCollectionRef = collection(
    db,
    `users/${user.uid}/categories/${categoryId}/sticks`
  )
  const data = await getDocs(sticksCollectionRef)
  let sticks: Stick[] = []
  data.forEach((doc) => {
    const category = { ...doc.data(), id: doc.id } as Stick
    sticks.push(category)
  })
  return sticks
}

export const addStick = async (
  user: any,
  categoryId: string,
  stickName: string
) => {
  const newStick = { name: stickName, date: new Date(), answers: [] }
  try {
    const stickCollectionRef = collection(
      db,
      `users/${user.uid}/categories/${categoryId}/sticks`
    )
    const docRef = await addDoc(stickCollectionRef, newStick)
    console.log(docRef.id)
    return docRef.id
  } catch (error) {
    const e = error as Error
    console.log(e.message)
  }
}

export const editStick = async (
  user: any,
  categoryId: string,
  stickId: string,
  stickName: string
) => {
  const docRef = doc(
    db,
    `users/${user.uid}/categories/${categoryId}/sticks`,
    stickId
  )
  await setDoc(docRef, { name: stickName }, { merge: true })
}
export const removeStick = async (
  user: any,
  categoryId: string,
  stickId: string
) => {
  const docRef = doc(
    db,
    `users/${user.uid}/categories/${categoryId}/sticks`,
    stickId
  )
  await deleteDoc(docRef)
}

export const editStickAnswer = async (
  user: any,
  categoryId: string,
  chosenStick: Stick,
  isKnow: boolean
) => {
  const docRef = doc(
    db,
    `users/${user.uid}/categories/${categoryId}/sticks`,
    chosenStick.id
  )
  await setDoc(
    docRef,
    { answers: arrayUnion({ date: new Date(), isKnow }) },
    { merge: true }
  )
}

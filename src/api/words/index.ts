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
import { Word } from "./interfaces"

export const getWords = async (user: any, categoryId: string) => {
  const wordsCollectionRef = collection(
    db,
    `users/${user.uid}/categories/${categoryId}/words`
  )
  const data = await getDocs(wordsCollectionRef)
  let words: Word[] = []
  data.forEach((doc) => {
    const word = { ...doc.data(), id: doc.id } as Word
    words.push(word)
  })
  return words
}

export const addWord = async (user: any, categoryId: string, word: Word) => {
  try {
    const wordCollectionRef = collection(
      db,
      `users/${user.uid}/categories/${categoryId}/words`
    )
    const docRef = await addDoc(wordCollectionRef, word)
    console.log(docRef.id)
    return docRef.id
  } catch (error) {
    const e = error as Error
    console.log(e.message)
  }
}

export const editWord = async (user: any, categoryId: string, word: Word) => {
  if (!word.id) throw new Error("word has no id")
  const docRef = doc(
    db,
    `users/${user.uid}/categories/${categoryId}/words`,
    word.id
  )
  let updatedWord = { ...word }
  updatedWord.date = Timestamp.now()
  await setDoc(docRef, word, { merge: true })
  return docRef.id
}
export const removeWord = async (
  user: any,
  categoryId: string,
  wordId: string
) => {
  const docRef = doc(
    db,
    `users/${user.uid}/categories/${categoryId}/words`,
    wordId
  )
  await deleteDoc(docRef)
  return docRef.id
}

//   export const editStickAnswer = async (
//     user: any,
//     categoryId: string,
//     chosenStick: Word,
//     isKnow: boolean
//   ) => {
//     const docRef = doc(
//       db,
//       `users/${user.uid}/categories/${categoryId}/words`,
//       chosenStick.id
//     )
//     await setDoc(
//       docRef,
//       { answers: arrayUnion({ date: new Date(), isKnow }) },
//       { merge: true }
//     )
//   }

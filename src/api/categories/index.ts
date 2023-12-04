import {
  getDocs,
  collection,
  Timestamp,
  deleteDoc,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore"
import { db } from "@/firebase"
import { Category } from "./interfaces"

export const getCategories = async (user: any) => {
  const categoriesCollectionRef = collection(db, `users/${user.uid}/categories`)
  const data = await getDocs(categoriesCollectionRef)
  let categories: Category[] = []
  data.forEach((doc) => {
    let category = { ...doc.data(), id: doc.id } as Category
    categories.push(category)
  })

  return categories
}

export const editCategory = async (
  user: any,
  categoryId: string,
  categoryName: string,
  bgColor: string
) => {
  // console.log({ user.uid, categoryId, categoryName })
  const docRef = doc(db, `users/${user.uid}/categories`, categoryId)
  await setDoc(docRef, { name: categoryName, bgColor }, { merge: true })
}

export const addCategory = async (user: any, name: string, bgColor: string) => {
  const newCategory = { name, date: new Date(), bgColor }
  try {
    const categoryCollectionRef = collection(db, `users/${user.uid}/categories`)
    const docRef = await addDoc(categoryCollectionRef, newCategory)
    console.log(docRef.id)
    return docRef.id
  } catch (error) {
    const e = error as Error
    console.log(e.message)
  }
}

export const removeCategory = async (user: any, categoryId: string) => {
  const docRef = doc(db, `users/${user.uid}/categories`, categoryId)
  await deleteDoc(docRef)
}

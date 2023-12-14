import { Category } from "@/api/categories/interfaces"
import { Word } from "@/api/words/interfaces"
import { Timestamp } from "firebase/firestore"
import { makeAutoObservable, toJS } from "mobx"
import * as API from "@/api/categories"
import * as API_WORDS from "@/api/words"
import { messageStore } from "./messageStore"
import Error from "next/error"
import { UserAuth } from "@/context/AuthContext"
const a = [
  {
    id: "89sl89234lkjt984jkltc8934",
    name: "что",
    translate: "what",
    type: "shto",
    hint: "drink the water",
    knows: 0,
  },
  {
    id: "89sl89234lkjt984jkltc4934",
    name: "Как вы",
    translate: "how are you",
    type: "kak dila",
    hint: "חרא של דיל",
    knows: 0,
  },
  {
    id: "89sl89234lkjt984jkltc2934",
    name: "почему",
    translate: "why",
    type: "pachimu",
    hint: "pahsa is doing a muuuu",
    knows: 0,
  },
  {
    id: "89sl89234lkjt984jkltc7934",
    name: "черный",
    translate: "black",
    type: "chernyy",
    hint: "שירים של ני",
    knows: 0,
  },

  {
    id: "8mx9834lkj8lkcu4y84jkltc7934",
    hint: "3tsrt של ני",
    knows: 0,
    name: "Ресторан",
    translate: "Restaurant",
    type: "Restoran",
  },
  {
    id: "8mx9834lkj8lkcuy284jkltc7934",
    hint: "ttsrdt של ני",
    knows: 0,
    name: "Меню",
    translate: "Menu",
    type: "Menyu",
  },
  {
    id: "8mx9834l6kj8lkcuy84jkltc7934",
    hint: "rrr של ני",
    knows: 0,
    name: "Официант",
    translate: "Waiter",
    type: "Ofitsiant",
  },
  {
    id: "8mx9834lkj8lkcuy842jkltc7934",
    hint: "c3c של ני",
    knows: 0,
    name: "Официантка",
    translate: "Waitress",
    type: "Ofitsiantka",
  },
  {
    id: "8mx9834lkj8lk8cuy84jkltc7934",
    hint: "שירים c43dts ני",
    knows: 0,
    name: "Заказ",
    translate: "Order",
    type: "Zakaz",
  },
  {
    id: "8mx9834lkj8lkc1uy84jkltc7934",
    hint: "c34 של ני",
    knows: 0,
    name: "Столик",
    translate: "Table",
    type: "Stolik",
  },
  {
    id: "8mx9834lkj8lkcu88y84jkltc7934",
    hint: "32 של ני",
    knows: 0,
    name: "Счёт",
    translate: "Bill",
    type: "Schyot",
  },
  {
    id: "8mx9834lkj8lkcuy284jkltc7934",
    hint: "t34 של ני",
    knows: 0,
    name: "Чаевые",
    translate: "Tip",
    type: "Chaevye",
  },
  {
    id: "8mx9834l1kj8lkcuy84jkltc7934",
    hint: "w3pg של ני",
    knows: 0,
    name: "Блюдо",
    translate: "Dish",
    type: "Blyudo",
  },
  {
    id: "8mx9834lkj8lkc8uy84jkltc7934",
    hint: "t4w של ני",
    knows: 0,
    name: "Напиток",
    translate: "Drink",
    type: "Napitok",
  },
]
class App {
  categories: Category[] = []
  words: Word[] = []
  chosenWord: Word | null = null
  chosenCategory: Category | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setChosenWord = (w: Word) => {
    this.chosenWord = w
  }

  setChosenCategory = (cat: Category) => {
    this.chosenCategory = cat
    this.chosenWord = null
  }

  setCategories = (cats: Category[]) => {
    this.categories = cats
  }

  setWords = (wrds: Word[]) => {
    this.words = wrds
  }
  getCategories = async (user: any) => {
    try {
      this.categories = await API.getCategories(user)
      console.log(toJS(this.categories))

      messageStore.setMessage("Get categories successfully", 200)
    } catch (error: any) {
      messageStore.setMessage(error.message, 400)
    }
  }
  addCategory = async (user: any, name: string, bgColor: string) => {
    try {
      const newCategory = { name, date: Timestamp.now(), bgColor }

      const docId = await API.addCategory(user, newCategory)
      const addedCategory = { id: docId, ...newCategory }
      this.categories = [addedCategory, ...this.categories]
      console.log(toJS(docId))
      messageStore.setMessage("category added successfully", 200)
    } catch (error: any) {
      messageStore.setMessage(error.message, 400)
    }
  }
  removeCategory = async (user: any, categoryId: string) => {
    try {
      const docId = await API.removeCategory(user, categoryId)
      if (!docId) {
        messageStore.setMessage("Cannot remove the category " + categoryId, 400)
      }
      messageStore.setMessage("category removed successfully", 200)

      this.categories = this.categories.filter((c) => c.id !== categoryId)
    } catch (error: any) {
      messageStore.setMessage(error.message, 400)
    }
  }
  editCategory = async (
    user: any,
    categoryId: string,
    categoryName: string,
    bgColor: string
  ) => {
    try {
      const docId = await API.editCategory(
        user,
        categoryId,
        categoryName,
        bgColor
      )
      if (!docId) {
        messageStore.setMessage("Cannot edit the category " + categoryId, 200)
      }
      messageStore.setMessage("category edited successfully", 200)

      this.categories = this.categories.map((c) =>
        c.id === docId ? { ...c, name: categoryName, bgColor } : c
      )
    } catch (error: any) {
      messageStore.setMessage(error.message, 400)
    }
  }

  // WORDS
  getWords = async (user: any, categoryId: string) => {
    try {
      this.words = await API_WORDS.getWords(user, categoryId)
      if (this.words.length > 0) {
        this.chosenWord = this.words[0]
      }
      console.log(toJS(this.words))
      messageStore.setMessage("Get words successfully", 200)
    } catch (error: any) {
      messageStore.setMessage(error.message, 400)
    }
  }
  addWord = async (
    user: any,
    categoryId: string,
    name: string,
    translate: string,
    type: string,
    hint: string
  ) => {
    try {
      const newWord: Word = {
        name,
        date: Timestamp.now(),
        translate,
        type,
        hint,
        knows: 0,
      }
      const docId = await API_WORDS.addWord(user, categoryId, newWord)
      const addedWord = { id: docId, ...newWord }
      this.words = [addedWord, ...this.words]
      console.log(toJS(docId))
      messageStore.setMessage("word added successfully", 200)
    } catch (error: any) {
      messageStore.setMessage(error.message, 400)
    }
  }
  removeWord = async (user: any, categoryId: string, wordId: string) => {
    try {
      const docId = await API_WORDS.removeWord(user, categoryId, wordId)
      if (!docId) {
        messageStore.setMessage("Cannot remove the word " + wordId, 400)
      }
      messageStore.setMessage("word removed successfully", 200)

      this.words = this.words.filter((c) => c.id !== wordId)
    } catch (error: any) {
      messageStore.setMessage(error.message, 400)
    }
  }
  editWord = async (user: any, categoryId: string, word: Word) => {
    // const editedWord = { wordId, name, translate, type, hint }
    try {
      const docId = await API_WORDS.editWord(user, categoryId, word)
      if (!docId) {
        messageStore.setMessage("Cannot edit the word " + word.id, 400)
      }

      this.words = this.words.map((w) => (w.id === word.id ? word : w))
      messageStore.setMessage("word edited successfully", 200)
    } catch (error: any) {
      messageStore.setMessage(error.message, 400)
    }
  }
}

const appStore = new App()
export default appStore

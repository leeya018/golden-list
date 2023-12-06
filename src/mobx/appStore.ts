import { Category } from "@/api/categories/interfaces"
import { Word } from "@/api/words/interfaces"
import { Timestamp } from "firebase/firestore"
import { makeAutoObservable } from "mobx"

class App {
  categories = [
    {
      id: "m9c28l893l9vck4ll34cnmy",
      name: "categoryA",
      date: Timestamp.now(),
      bgColor: "bg-color-red",
    },
    {
      id: "m9c28l893l9vck4ll37cnmy",
      name: "categoryB",
      date: Timestamp.now(),
      bgColor: "bg-color-red",
    },
    {
      id: "m9c28l893l9vck4ll32cnmy",
      name: "categoryC",
      date: Timestamp.now(),
      bgColor: "bg-color-red",
    },
    {
      id: "m9c28l893l9vck4ll31cnmy",
      name: "categoryD",
      date: Timestamp.now(),
      bgColor: "bg-color-red",
    },
  ]
  words = [
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
  ]
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
  }

  setCategories = (cats: Category[]) => {
    this.categories = cats
  }

  setWords = (wrds: Word[]) => {
    this.words = wrds
  }
}

const appStore = new App()
export default appStore

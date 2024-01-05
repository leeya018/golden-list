import { Category } from "@/api/categories/interfaces"
import { Exam, Word } from "@/api/words/interfaces"
import { Language, getUrl, parseJSON } from "@/util"
import axios from "axios"
import { Timestamp } from "firebase/firestore"
import { makeAutoObservable, toJS } from "mobx"
import appStore from "./appStore"

class Gpt {
  isLoading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  setIsLoading = (isLoading: boolean) => {
    this.isLoading = isLoading
  }

  getArticleImagesApi = async (searchTxt: string) => {
    try {
      this.isLoading = true
      const res = await axios.post(
        getUrl() + "/image",
        { searchTxt },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      console.log("getArticleImagesApi")
      console.log(res)
      this.isLoading = false
      return res.data
    } catch (error) {
      this.isLoading = false
      console.error("Error fetching user:", error)
    }
  }

  askGptByWordApi = async (translateList: string[]) => {
    try {
      gptStore.setIsLoading(true)

      if (!appStore.chosenCategory?.name) throw new Error("categoryId is null")
      if (translateList.length === 0)
        throw new Error("translateList amount must be greater than 0")
      const translateListStr = translateList.join(",")
      const question = ` take this translateList : ${translateListStr} .
       from that translateList create a new array of wordsItems.
      each wordItem will have those fields:
          translate: (a word from the translateList ),
          name: (the word itself in the ${Language} language),
          type : (the way you should read the wordName in  english)
  I want you to return an array in js with those words items 
  (please return only the array - no code)
  (please return only the array without any other explanation, and return the field names with double brackets. example: 
    [{
      "name": "...",
      "translate": "...",
      "type": "..."
      },...]
    )
      `
      console.log("url   ", getUrl() + "/gpt")
      const res = await axios.post(
        getUrl() + "/gpt",
        { question },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      console.log(res.data)
      console.log(typeof res.data)

      const wordsAns: any[] = parseJSON(res.data)

      console.log(typeof wordsAns)
      console.log({ wordsAns })

      this.isLoading = false

      gptStore.setIsLoading(false)
      return wordsAns
    } catch (error) {
      gptStore.setIsLoading(false)

      console.error("Error fetching user:", error)
    }
  }

  askGptAllWordsApi = async (wordsAmount: number) => {
    try {
      this.isLoading = true

      if (!appStore.chosenCategory?.name) throw new Error("categoryId is null")
      if (wordsAmount === 0)
        throw new Error("word amount must be greater than 0")
      const question = `
  Here are ${wordsAmount} common 
  ${Language} words related to the ${appStore.chosenCategory.name} category and put it in array with items :{
  name: (the word),
  translate: (the translation),
  type : (the way you should read it en english)
  }
  I want you to return an array in js with those words items 
  (please return only the array without any other explanation, and return the field names with double brackets. example: 
    [{
      "name": "...",
      "translate": "...",
      "type": "..."
      },...]
    )
  `
      console.log("url   ", getUrl() + "/gpt")
      const res = await axios.post(
        getUrl() + "/gpt",
        { question },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      console.log(res.data)
      console.log(typeof res.data)

      const wordsAns: any[] = parseJSON(res.data)

      console.log(typeof wordsAns)
      console.log({ wordsAns })

      this.isLoading = false

      return wordsAns
    } catch (error) {
      this.isLoading = false

      console.error("Error fetching user:", error)
    }
  }
}

const gptStore = new Gpt()
export default gptStore

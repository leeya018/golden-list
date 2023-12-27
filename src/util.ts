import { Timestamp } from "firebase/firestore"
import {
  CategoriesTableProps,
  Order,
} from "./components/categoriesTable/hooks/interfaces"
import { Category } from "./api/categories/interfaces"
import moment from "moment"
import { Word } from "./api/words/interfaces"
import { toJS } from "mobx"

export const modals = {
  addCategory: "addCategory",
  editCategory: "editCategory",
  addWord: "addWord",
  editWord: "editWord",
  viewWord: "viewWord",
  success: "success",
  confirmDeleteCategory: "confirmDeleteCategory",
  confirmDeleteWord: "confirmDeleteWord",
  examSaved: "examSaved",
}

export const getResponse = (message: string, data = "") => {
  return {
    SUCCESS: {
      status: 200,
      message,
      isSuccess: true,
      data,
    },
    PERMISSION: {
      status: 401,
      message,
      isSuccess: false,
    },
    BAD_REQUEST: {
      status: 400,
      message,
      isSuccess: false,
    },
    NOT_FOUND: {
      status: 404,
      message,
      isSuccess: false,
    },
    GENERAL_ERROR: {
      status: 500,
      message,
      isSuccess: false,
    },
  }
}
export const sortCategoriesByName = (categories: Category[], order: string) => {
  const sortedCategories = categories.sort((c1: Category, c2: Category) => {
    if (c1.name < c2.name) {
      if (order == Order.asc) return -1
      else return 1
    }
    if (c1.name > c2.name) {
      if (order == Order.asc) return 1
      else return -1
    }
    return 0
  })
  return sortedCategories
}
export const sortCategoriesByDate = (categories: Category[], order: string) => {
  const sortedCategories = categories.sort((c1: Category, c2: Category) => {
    if (order == Order.asc) {
      return moment(c1.date.toDate()).diff(moment(c2.date.toDate()))
    }

    return moment(c2.date.toDate()).diff(moment(c1.date.toDate()))
  })
  return sortedCategories
}

//  sticks sorts
export const sortWordsByName = (words: Word[], order: string) => {
  const sortedSticks = words.sort((c1: Word, c2: Word) => {
    if (c1.name < c2.name) {
      if (order == Order.asc) return -1
      else return 1
    }
    if (c1.name > c2.name) {
      if (order == Order.asc) return 1
      else return -1
    }
    return 0
  })
  return sortedSticks
}
export const sortWordsByDate = (words: Word[], order: string) => {
  const sortedSticks = words.sort((c1: Word, c2: Word) => {
    if (order == Order.asc) {
      return moment(c1.date.toDate()).diff(moment(c2.date.toDate()))
    }

    return moment(c2.date.toDate()).diff(moment(c1.date.toDate()))
  })
  return sortedSticks
}

export const isSameDay = (dateA: Timestamp, dateB: Timestamp) => {
  return getFullDate(dateA) === getFullDate(dateB)
}
export const convertPlainToTimestamp = (plainTimestamp: Timestamp) => {
  const firebaseTimestamp = new Timestamp(
    plainTimestamp.seconds,
    plainTimestamp.nanoseconds
  )
  return firebaseTimestamp
}
export const getFullDate = (date: Timestamp) => {
  // console.log(toJS(date))

  // console.log(Timestamp.now())
  // console.log(Timestamp.now().toDate())
  const momentDate = moment(convertPlainToTimestamp(date).toDate())
  const strDate = momentDate.format("MM/DD/YYYY")
  return strDate
}

export const sleep = (time: number) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve("done")
    }, time)
  )

export const WordsMode = {
  test: "test",
  show: "show",
  practice: "practice",
}
export const WordsPracticeMode = {
  click: "click",
  focus: "focus",
  hover: "hover",
}
export const NavNames = {
  home: "home",
  exam: "exam",
  login: "login",
  settings: "settings/categories",
  gpt: "gpt",
  other: "other",
}

export const ExamQuestionsAmount = 20

export const getUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASIC_URL
    : process.env.NEXT_PUBLIC_BASIC_URL_PRODUCTION
}
export const parseJSON = (jsonString: string) => {
  try {
    return JSON.parse(jsonString)
  } catch (e) {
    console.error("Error parsing JSON:", e)
    return null // or return an empty object/array as a fallback
  }
}

export const Language = "filipino (Tagalo)"

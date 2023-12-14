import { Timestamp } from "firebase/firestore"
import {
  CategoriesTableProps,
  Order,
} from "./components/categoriesTable/hooks/interfaces"
import { Category } from "./api/categories/interfaces"
import moment from "moment"
import { Word } from "./api/words/interfaces"

export const modals = {
  addCategory: "addCategory",
  editCategory: "editCategory",
  addWord: "addWord",
  editWord: "editWord",
  viewWord: "viewWord",
  success: "success",
  confirmDeleteCategory: "confirmDeleteCategory",
  confirmDeleteWord: "confirmDeleteWord",
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
  other: "other",
}

export const ExamQuestionsAmount = 20

import { Timestamp } from "firebase/firestore"
import {
  CategoriesTableProps,
  Order,
} from "./components/categoriesTable/hooks/interfaces"
import { Category } from "./api/categories/interfaces"
import moment from "moment"
import { Stick } from "./api/sticks/interfaces"

export const modals = {
  addCategory: "addCategory",
  editCategory: "editCategory",
  addStick: "addStick",
  editStick: "editStick",
  viewStick: "viewStick",
  success: "success",
  confirmDeleteCategory: "confirmDeleteCategory",
  viewWord: "viewWord",
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
export const sortSticksByName = (sticks: Stick[], order: string) => {
  const sortedSticks = sticks.sort((c1: Stick, c2: Stick) => {
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
export const sortSticksByDate = (sticks: Stick[], order: string) => {
  const sortedSticks = sticks.sort((c1: Stick, c2: Stick) => {
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
}
export const NavNames = {
  home: "home",
  exam: "exam",
  login: "login",
  other: "other",
}

export const ExamQuestionsAmount = 20

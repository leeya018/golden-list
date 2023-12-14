import { WordsMode, WordsPracticeMode } from "@/util"
import { makeAutoObservable } from "mobx"

class SelectMode {
  mainMode = WordsMode.practice
  practiceMode = WordsPracticeMode.click

  constructor() {
    makeAutoObservable(this)
  }

  setMainMode = (mode) => {
    this.mainMode = mode
  }
  setPracticeMode = (mode) => {
    this.practiceMode = mode
  }
}

const selectModeStore = new SelectMode()
export default selectModeStore

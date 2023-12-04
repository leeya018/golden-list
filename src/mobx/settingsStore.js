import { makeAutoObservable } from "mobx"

class Settings {
  practiceRepetition = 5

  constructor() {
    makeAutoObservable(this)
  }

  setPracticeRepetition = (reps) => {
    this.practiceRepetition = reps
  }
}
export const SettingsStore = new Settings()

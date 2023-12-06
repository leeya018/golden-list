import { makeAutoObservable } from "mobx"

class Exam {
  score = 0
  constructor() {
    makeAutoObservable(this)
  }

  setScore = (sc) => {
    this.score = sc
  }

  increaseScore = () => {
    this.score = this.score + 1
  }
}

const examStore = new Exam()
export default examStore

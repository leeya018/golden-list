import { makeAutoObservable } from "mobx"

class Exam {
  correct = 0
  mistake = 0
  constructor() {
    makeAutoObservable(this)
  }

  increaseCorrect = () => {
    this.correct += 1
  }
  increaseMistake = () => {
    this.mistake += 1
  }
  getScore = () => {
    if (this.correct + this.mistake === 0) return 0
    return (this.correct / 20) * 100
  }
}

const examStore = new Exam()
export default examStore

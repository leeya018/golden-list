import { makeAutoObservable } from "mobx"

class Filter {
  search = ""

  constructor() {
    makeAutoObservable(this)
  }

  setFilter = (search) => {
    this.search = search
  }
}

const filterStore = new Filter()
export default filterStore

// import { Timestamp } from "firebase/firestore"
// import { makeAutoObservable } from "mobx"
// // const [chosenWord, setChosenWord] = useState<Word | null>(null)
// // const [chosenCategory, setChosenCategory] = useState<Category | null>(null)
// // const [categories, setCategories] = useState<Category[]>([
// //   {
// //     id: Math.random().toString(),
// //     name: "categoryA",
// //     date: Timestamp.now(),
// //     bgColor: "bg-color-red",
// //   },
// //   {
// //     id: Math.random().toString(),
// //     name: "categoryB",
// //     date: Timestamp.now(),
// //     bgColor: "bg-color-red",
// //   },
// //   {
// //     id: Math.random().toString(),
// //     name: "categoryC",
// //     date: Timestamp.now(),
// //     bgColor: "bg-color-red",
// //   },
// //   {
// //     id: Math.random().toString(),
// //     name: "categoryD",
// //     date: Timestamp.now(),
// //     bgColor: "bg-color-red",
// //   },
// // ])
// // const [words, setWords] = useState<Word[]>([
// //   {
// //     id: Math.random().toString(),
// //     name: "что",
// //     translate: "what",
// //     type: "shto",
// //     hint: "drink the water",
// //     knows: 0,
// //   },
// //   {
// //     id: Math.random().toString(),
// //     name: "Как вы",
// //     translate: "how are you",
// //     type: "kak dila",
// //     hint: "חרא של דיל",
// //     knows: 0,
// //   },
// //   {
// //     id: Math.random().toString(),
// //     name: "почему",
// //     translate: "why",
// //     type: "pachimu",
// //     hint: "pahsa is doing a muuuu",
// //     knows: 0,
// //   },
// //   {
// //     id: Math.random().toString(),
// //     name: "черный",
// //     translate: "black",
// //     type: "chernyy",
// //     hint: "שירים של ני",
// //     knows: 0,
// //   },
// // ])

// const categories = [
//   {
//     id: Math.random().toString(),
//     name: "categoryA",
//     date: Timestamp.now(),
//     bgColor: "bg-color-red",
//   },
//   {
//     id: Math.random().toString(),
//     name: "categoryB",
//     date: Timestamp.now(),
//     bgColor: "bg-color-red",
//   },
//   {
//     id: Math.random().toString(),
//     name: "categoryC",
//     date: Timestamp.now(),
//     bgColor: "bg-color-red",
//   },
//   {
//     id: Math.random().toString(),
//     name: "categoryD",
//     date: Timestamp.now(),
//     bgColor: "bg-color-red",
//   },
// ]
// const words  = [
//   {
//     id: Math.random().toString(),
//     name: "что",
//     translate: "what",
//     type: "shto",
//     hint: "drink the water",
//     knows: 0,
//   },
//   {
//     id: Math.random().toString(),
//     name: "Как вы",
//     translate: "how are you",
//     type: "kak dila",
//     hint: "חרא של דיל",
//     knows: 0,
//   },
//   {
//     id: Math.random().toString(),
//     name: "почему",
//     translate: "why",
//     type: "pachimu",
//     hint: "pahsa is doing a muuuu",
//     knows: 0,
//   },
//   {
//     id: Math.random().toString(),
//     name: "черный",
//     translate: "black",
//     type: "chernyy",
//     hint: "שירים של ני",
//     knows: 0,
//   },
// ]
// class App {
//   categories = [...categories]
//   words = []

//   chosenWord= null

//   chosenCategory = null

//   constructor() {
//     makeAutoObservable(this)
//   }

//   setCategories = (cats) => {
//     this.categories = cats
//   }

//   setWords = (cats) => {
//     this.categories = cats
//   }
// }

// const appStore = new App()
// export default appStore

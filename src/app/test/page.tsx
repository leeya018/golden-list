"use client"

import { observer } from "mobx-react-lite"
import { FC, useState, useEffect } from "react"
import { FcApproval } from "react-icons/fc"
import Image from "next/image"
import { FaChevronLeft } from "react-icons/fa6"
import { FaChevronRight } from "react-icons/fa6"
import Nav from "@/components/nav"
import CategoryList from "@/components/categoryList"
import { Timestamp } from "firebase/firestore"
import { Category } from "@/api/categories/interfaces"
import { Word } from "@/api/words/interfaces"
import WordList from "@/components/wordList"

const wordsData_old = [
  {
    id: "t09wlum0t3920239",
    name: "что",
    translate: "what",
    type: "shto",
    hint: "drink the water",
    knows: 0,
  },
  {
    id: "t09wlum0t3920231",
    name: "Как вы",
    translate: "how are you",
    type: "kak dila",
    hint: "חרא של דיל",
    knows: 0,
  },
  {
    id: "t09wlum0t3920232",
    name: "почему",
    translate: "why",
    type: "pachimu",
    hint: "pahsa is doing a muuuu",
    knows: 0,
  },
  {
    id: "t09wlum0t3920233",
    name: "черный",
    translate: "black",
    type: "chernyy",
    hint: "שירים של ני",
    knows: 0,
  },
  {
    id: "t09wlum0t3920234",
    name: "красный",
    translate: "red",
    type: "krasnyy",
    hint: "karas to the knee make the blood red",
    knows: 0,
  },
  {
    id: "t09wlum0t3920235",
    name: "синий",
    translate: "blue",
    type: "siniy",
    hint: "sini is not yellow , its blue",
    knows: 0,
  },
  {
    id: "t09wlum0t3920236",
    name: "фиолетовый",
    translate: "purple",
    type: "fioletovyy",
    hint: "violet with a v",
    knows: 0,
  },
]
const wordsData = [
  {
    name: "Ресторан",
    translate: "Restaurant",
    type: "Restoran",
    knows: 0,
    hint: "similar",
    id: Math.random(),
  },

  {
    name: "Меню",
    translate: "Menu",
    type: "Menyu",
    knows: 0,
    hint: "similar",
    id: Math.random(),
  },
  {
    name: "Официант",
    translate: "Waiter",
    type: "Ofitsiant",
    knows: 0,
    hint: "office",
    id: Math.random(),
  },
  {
    name: "Официантка",
    translate: "Waitress",
    type: "Ofitsiantka",
    knows: 0,
    hint: "office ka",
    id: Math.random(),
  },
  {
    name: "Заказ",
    translate: "Order",
    type: "Zakaz",
    knows: 0,
    hint: "zaaka to order",
    id: Math.random(),
  },
  {
    name: "Столик",
    translate: "Table",
    type: "Stolik",
    knows: 0,
    hint: "stool",
    id: Math.random(),
  },
  {
    name: "Счёт",
    translate: "Bill",
    type: "Schyot",
    knows: 0,
    hint: "bill is not stia",
    id: Math.random(),
  },
  {
    name: "Чаевые",
    translate: "Tip",
    type: "Chaevye",
    knows: 0,
    hint: "chai is a v for getting the tip",
    id: Math.random(),
  },
  {
    name: "Блюдо",
    translate: "Dish",
    type: "Blyudo",
    knows: 0,
    hint: "not dish can be hold with no hands",
    id: Math.random(),
  },
  {
    name: "Напиток",
    translate: "Drink",
    type: "Napitok",
    knows: 0,
    hint: "drink you take with napkin with tok tok",
    id: Math.random(),
  },
]
const MainPage = observer(() => {
  const [chosenWord, setChosenWord] = useState<Word | null>(null)
  const [chosenCategory, setChosenCategory] = useState<Category | null>(null)
  const [categories, setCategories] = useState<Category[]>([
    {
      id: Math.random().toString(),
      name: "categoryA",
      date: Timestamp.now(),
      bgColor: "bg-color-red",
    },
    {
      id: Math.random().toString(),
      name: "categoryB",
      date: Timestamp.now(),
      bgColor: "bg-color-red",
    },
    {
      id: Math.random().toString(),
      name: "categoryC",
      date: Timestamp.now(),
      bgColor: "bg-color-red",
    },
    {
      id: Math.random().toString(),
      name: "categoryD",
      date: Timestamp.now(),
      bgColor: "bg-color-red",
    },
  ])
  const [words, setWords] = useState<Word[]>([
    {
      id: Math.random().toString(),
      name: "что",
      translate: "what",
      type: "shto",
      hint: "drink the water",
      knows: 0,
    },
    {
      id: Math.random().toString(),
      name: "Как вы",
      translate: "how are you",
      type: "kak dila",
      hint: "חרא של דיל",
      knows: 0,
    },
    {
      id: Math.random().toString(),
      name: "почему",
      translate: "why",
      type: "pachimu",
      hint: "pahsa is doing a muuuu",
      knows: 0,
    },
    {
      id: Math.random().toString(),
      name: "черный",
      translate: "black",
      type: "chernyy",
      hint: "שירים של ני",
      knows: 0,
    },
  ])

  return (
    <div className="w-full h-[100vh] ">
      {/* nav */}
      <Nav />
      {/* categories */}
      <CategoryList
        categories={categories}
        setChosenCategory={setChosenCategory}
        chosenCategory={chosenCategory as Category}
      />
      {/*  words */}
      <div className="w-full border-2 flex  mx-5 h-full">
        <WordList
          words={words}
          setWords={setWords}
          chosenWord={chosenWord as Word}
          setChosenWord={setChosenWord}
        />
        <div className="w-3/4 p-5">word view</div>
      </div>
    </div>
  )
})

export default MainPage

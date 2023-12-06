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
import PrimaryButton from "@/ui/button/primary"
import WordTest from "@/components/wordTest"
import ModeChoose from "@/components/modeChoose"
import { WordsMode } from "@/util"
import WordView from "@/components/wordView"

const HomePage = observer(() => {
  const [mode, setMode] = useState<string>(WordsMode.show)

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
        setCategories={setCategories}
        setChosenCategory={setChosenCategory}
        chosenCategory={chosenCategory as Category}
      />
      {/* mode */}
      <ModeChoose mode={mode} setMode={setMode} />
      {/*  words */}
      <div className="w-full border-2 flex  mx-5 h-full">
        <WordList
          words={words}
          setWords={setWords}
          chosenWord={chosenWord as Word}
          setChosenWord={setChosenWord}
        />

        {chosenWord &&
          (mode === WordsMode.test ? (
            <WordTest
              words={words}
              setWords={setWords}
              word={chosenWord as Word}
            />
          ) : (
            <WordView word={chosenWord as Word} />
          ))}
      </div>
    </div>
  )
})

export default HomePage

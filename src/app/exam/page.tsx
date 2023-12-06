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
import WordExam from "@/components/wordExam"
import appStore from "@/mobx/appStore"
import examStore from "@/mobx/examStore"

const ExamPage = observer(() => {
  const [mode, setMode] = useState<string>(WordsMode.show)

  return (
    <div className="w-full h-[100vh] ">
      {/* nav */}
      <Nav />
      {/* categories */}
      <CategoryList />

      {/*  words */}
      <div className="w-full border-2 flex  mx-auto h-full">
        <ul
          className="overflow-y-auto  flex 
            flex-wrap items-start justify-center gap-2"
        >
          <div>{examStore.getScore()}</div>
          {appStore.words.map((word, key) => (
            <WordExam key={key} word={word} />
          ))}
        </ul>
      </div>
    </div>
  )
})

export default ExamPage

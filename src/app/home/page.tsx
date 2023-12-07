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
import appStore from "@/mobx/appStore"
import { UserAuth } from "@/context/AuthContext"
import * as API from "@/api/categories"
import Alerts from "@/ui/Alerts"

const HomePage = observer(() => {
  const [mode, setMode] = useState<string>(WordsMode.show)

  const { user } = UserAuth()
  return (
    <div className="w-full h-[100vh] ">
      {/* alerts */}
      <Alerts />
      {/* nav */}
      <button
        className="cursor-pointer"
        onClick={() => appStore.getCategories(user)}
      >
        add{" "}
      </button>
      <Nav />
      {/* categories */}
      <CategoryList />
      {/* mode */}
      <ModeChoose mode={mode} setMode={setMode} />
      {/*  words */}
      <div className="w-full border-2 flex  h-full">
        <WordList />

        {appStore.chosenWord &&
          (mode === WordsMode.test ? <WordTest /> : <WordView />)}
      </div>
    </div>
  )
})

export default HomePage

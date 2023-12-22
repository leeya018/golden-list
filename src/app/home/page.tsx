"use client"

import { observer } from "mobx-react-lite"
import { FC, useState, useEffect, useRef } from "react"
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
import { WordsMode, WordsPracticeMode, modals } from "@/util"
import WordView from "@/components/wordView"
import appStore from "@/mobx/appStore"
import { UserAuth } from "@/context/AuthContext"
import * as API from "@/api/categories"
import Alerts from "@/ui/Alerts"
import { ModalStore } from "@/mobx/modalStore"
import AddModal from "@/ui/modal/word/add"
import Confetti from "@/ui/confetti"
import ModeChoosePractice from "@/components/modeChoose/practice"
import WordBoard from "@/components/wordBoard"
import selectModeStore from "@/mobx/selectModeStore"

const HomePage = observer(() => {
  // const [mode, setMode] = useState<string>(WordsMode.practice)
  // // const [practiceMode, setPracticeMode] = useState<string>(
  // //   WordsPracticeMode.click
  // // )

  const { mainMode, practiceMode } = selectModeStore
  const { user } = UserAuth()

  return (
    <div className="w-full h-[100vh] ">
      {/* alerts */}
      <Alerts />
      {/* nav */}

      <Nav />
      <div className="flex-1 overflow-auto h-full mb-40">
        {/* categories */}
        <CategoryList />

        {/* mode */}
        <ModeChoose />
        {/* mode practice */}
        {mainMode === WordsMode.practice && <ModeChoosePractice />}
        {/*  words in practice */}
        {mainMode === WordsMode.practice && (
          <WordBoard practiceMode={practiceMode} />
        )}
        {/*  words */}
        {mainMode !== WordsMode.practice && (
          <div className="w-full border-2 flex  h-full">
            <div id="container"></div>
            <WordList />

            {mainMode === WordsMode.test && appStore.chosenWord && <WordTest />}
            {mainMode === WordsMode.show && appStore.chosenWord && <WordView />}
          </div>
        )}
      </div>
    </div>
  )
})

export default HomePage

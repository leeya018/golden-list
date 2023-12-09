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
import { ExamQuestionsAmount, WordsMode, modals } from "@/util"
import WordView from "@/components/wordView"
import WordExam from "@/components/wordExam"
import appStore from "@/mobx/appStore"
import examStore from "@/mobx/examStore"
import { ModalStore } from "@/mobx/modalStore"
import SuccessModal from "@/ui/modal/success"
import useSound from "@/hooks/useSound"

const ExamPage = observer(() => {
  const { playSound, stopSound } = useSound("/sounds/win.wav")
  useEffect(() => {
    if (examStore.correct + examStore.mistake === appStore.words.length) {
      ModalStore.openModal(modals.success)
      playSound()
    }
  }, [examStore.correct, examStore.mistake])

  return (
    <div className="w-full h-[100vh] ">
      {modals.success === ModalStore.modalName && (
        <SuccessModal
          onClose={() => {
            stopSound()

            ModalStore.closeModal()
          }}
          title={"Good Exam"}
          message={"your score is : " + examStore.getScore()}
        />
      )}
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
          {appStore.words.map((word, key) => (
            <WordExam key={key} word={word} />
          ))}
        </ul>
      </div>
    </div>
  )
})

export default ExamPage

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
import { ExamQuestionsAmount, WordsMode, isSameDay, modals } from "@/util"
import WordView from "@/components/wordView"
import WordExam from "@/components/wordExam"
import appStore from "@/mobx/appStore"
import examStore from "@/mobx/examStore"
import { ModalStore } from "@/mobx/modalStore"
import SuccessModal from "@/ui/modal/success"
import useSound from "@/hooks/useSound"
import { UserAuth } from "@/context/AuthContext"
import Title from "@/ui/title"
import SavedScoreModal from "@/ui/modal/savedScore"

const ExamPage = observer(() => {
  const { playSound, stopSound } = useSound("/sounds/win.wav")
  const { user } = UserAuth()
  const [isSaved, setIsSaved] = useState(true)

  useEffect(() => {
    if (examStore.correct + examStore.mistake === appStore.words.length) {
      ModalStore.openModal(modals.success)
      // playSound()
    }
  }, [examStore.correct, examStore.mistake])

  const isExamDone = () => {
    const doneWords = appStore.words.filter((word) => {
      if (!word.examResults) throw new Error("ExamResults array is empty")
      const len = word.examResults?.length
      if (len !== 0) {
        if (isSameDay(word.examResults[len - 1].date, Timestamp.now())) {
          return word
        }
      }
    })
    return appStore.words.length === doneWords.length
  }
  const getDayNum = () => {
    const firstWord = appStore.words[0]
    if (!firstWord) return 1
    if (!firstWord.examResults) return 1
    const len = (firstWord.examResults || []).length
    return len + 1
  }
  const getWordsByDay = (dayNum: number) => {
    return appStore.words.filter((word) => {
      if (!word.examResults) return 1 === dayNum
      const len = word.examResults.length
      if (len === 0) return true
      const lastItem = word.examResults[len - 1]
      return (len < dayNum && !lastItem.isSuccess) || len === dayNum
    })
  }

  const dayNum = getDayNum()

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
      {modals.examSaved === ModalStore.modalName && (
        <SavedScoreModal
          onClose={() => {
            ModalStore.closeModal()
          }}
          title={"Exam score saved"}
          message={"saved"}
        />
      )}
      {/* nav */}
      <Nav />
      {/* categories */}
      <CategoryList />

      {/*  words */}
      <div className="w-full border-2 flex  mx-auto h-full flex-col">
        {/* {isExamDone() && ( */}
        <PrimaryButton
          onClick={async () => {
            await appStore.updateWordsExam(user)
            ModalStore.openModal(modals.examSaved)
            setIsSaved(true)
          }}
          disabled={isSaved}
          className={`justify-normal ${
            isSaved ? "bg-color-disabled-gray" : "bg-color-blue"
          }`}
        >
          Save Exam results
        </PrimaryButton>
        {/* )} */}
        <PrimaryButton
          onClick={() => appStore.resetWordsExam(user)}
          className={`justify-normal bg-color-red`}
        >
          reset Exam results
        </PrimaryButton>
        <Title>Day Num: {dayNum}</Title>

        <ul
          className="overflow-y-auto  flex 
            flex-wrap items-start justify-center gap-2"
        >
          {getWordsByDay(dayNum).map((word, key) => (
            // {appStore.words.map((word, key) => (
            <WordExam key={key} word={word} setIsSaved={setIsSaved} />
          ))}
        </ul>
      </div>
    </div>
  )
})

export default ExamPage

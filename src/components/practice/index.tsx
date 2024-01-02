"use client"
import React, { FC, useEffect, useState } from "react"
import {
  getDocs,
  collection,
  Timestamp,
  deleteDoc,
  doc,
  setDoc,
  addDoc,
  arrayUnion,
} from "firebase/firestore"
import { db } from "@/firebase"

import CircularProgress from "@mui/material/CircularProgress"
import { observer } from "mobx-react-lite"
import Box from "@mui/material/Box"
import SuccessModal from "@/ui/modal/success"
import { modals } from "@/util"
import { ModalStore } from "@/mobx/modalStore"
import moment from "moment"
import { FcApproval, FcDisapprove } from "react-icons/fc"
import { PracticeProps, TitleProps } from "./hooks/interfaces"
import usePractice from "./hooks/usePractice"
import * as API from "@/api/sticks"
import { Stick } from "@/api/sticks/interfaces"
import Image from "next/image"
import ImageShow from "@/ui/ImageShow"
import { IoMdArrowRoundBack } from "react-icons/io"
import { SettingsStore } from "@/mobx/settingsStore"
import useSound from "@/hooks/useSound"

const isAnsweredToday = (stick: Stick) => {
  if (stick.answers.length === 0) return false
  const last = stick.answers.length - 1
  const ans = stick.answers[last]
  return (
    moment(ans.date.toDate()).format("DD-MM-YYYY") ===
    moment().format("DD-MM-YYYY")
  )
}

const Practice: FC<PracticeProps> = observer(({ categoryId }) => {
  const {
    user,
    sticks,
    setSticks,
    isLoading,
    setIsLoading,
    router,
    successInRow,
    setSuccessInRow,
    setIsShowImage,
    isShowImage,
  } = usePractice(categoryId, isAnsweredToday)
  const { sound, stopSound, playSound } = useSound("/sounds/win.wav")

  const editStickAnswer = async (chosenStick: Stick, isKnow: boolean) => {
    await API.editStickAnswer(user, categoryId, chosenStick, isKnow)
    const updatedSticks = sticks.map((stick) => {
      if (stick.id === chosenStick.id) {
        const ansItem = {
          date: Timestamp.now(),
          isKnow,
        }
        return {
          ...chosenStick,
          answers: [...chosenStick.answers, ansItem],
        }
      }
      return stick
    })
    setSticks(updatedSticks)
  }

  const isKnowToday = (stick: Stick) => {
    if (stick.answers.length === 0) return false
    const last = stick.answers.length - 1
    const ans = stick.answers[last]
    return (
      moment(ans.date.toDate()).format("DD-MM-YYYY") ==
        moment().format("DD-MM-YYYY") && ans.isKnow
    )
  }
  const isMistakeToday = (stick: Stick) => {
    if (stick.answers.length === 0) return false
    const last = stick.answers.length - 1
    const ans = stick.answers[last]
    return (
      moment(ans.date.toDate()).format("DD-MM-YYYY") ==
        moment().format("DD-MM-YYYY") && !ans.isKnow
    )
  }
  const getBeforeList = (sticks: Stick[]) => {
    return getListByRepetitionLimit(sticks).filter(
      (stick) => !isAnsweredToday(stick)
    )
  }
  const getAfterList = (sticks: Stick[]) => {
    return getListByRepetitionLimit(sticks).filter((stick) =>
      isAnsweredToday(stick)
    )
  }
  const getListByRepetitionLimit = (sticks: Stick[]) => {
    return sticks.filter((stick) => {
      const answersCorrect = stick.answers.filter((ans) => ans.isKnow === true)
      return answersCorrect.length < SettingsStore.practiceRepetition
    })
  }
  return (
    <div className=" h-full p-2 ">
      <IoMdArrowRoundBack
        className="cursor-pointer"
        size={25}
        onClick={() => {
          setIsLoading(true)
          router.back()
        }}
      />
      <div className="flex items-center gap-2 flex-col">
        <h1 className="font-bold   text-2xl  flex items-center">Practice </h1>
        <h2 className="font-bold   text-2xl  flex items-center">
          Answer what you know{" "}
        </h2>
      </div>
      {isLoading && (
        <Box
          sx={{ display: "flex" }}
          className="absolute top-1/2 left-1/2 -translate-y-20"
        >
          <CircularProgress />
        </Box>
      )}
      <ImageShow isShowImage={isShowImage} setIsShowImage={setIsShowImage} />
      {modals.success === ModalStore.modalName && (
        <SuccessModal
          onClose={() => {
            stopSound()
            setIsShowImage(false)
            ModalStore.closeModal()
          }}
          title={"Good Practice"}
          message={"you are the best"}
        />
      )}
      {sticks && (
        <div className="grid grid-cols-2 gap-10 ">
          <div className="flex flex-col items-center w-full  p-3">
            <Title>before</Title>
            <ul
              className={`h-[90vh] w-full ${
                getBeforeList(sticks).length > 0 ? "overflow-y-auto" : ""
              } `}
            >
              {getBeforeList(sticks).map((stick) => {
                return (
                  <li
                    key={stick.id}
                    className={`border-b-2 w-full border-color-text-gray flex flex-col py-2 shadow-sm
                `}
                  >
                    {isKnowToday(stick) && <FcApproval size={40} />}
                    {isMistakeToday(stick) && <FcDisapprove size={40} />}
                    <div className="w-full flex items-center gap-2">
                      <div>{stick.name}</div>
                      <div>({stick.answers.length})</div>
                    </div>

                    <div className="flex items-center gap-2 mt-2 ml-auto">
                      <button
                        onClick={() => {
                          setSuccessInRow((prev: number) => prev + 1)
                          editStickAnswer(stick, true)
                        }}
                        className="border-color-blue border-2 bg-color-blue text-color-white rounded-md py-2 px-4 cursor-pointer"
                      >
                        I KNOW
                      </button>
                      <button
                        onClick={() => {
                          setSuccessInRow(0)
                          editStickAnswer(stick, false)
                        }}
                        className="border-color-red border-2 bg-color-red text-color-white rounded-md py-2 px-4 cursor-pointer"
                      >
                        NOT YET
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          {/* second div */}
          <div className="flex flex-col items-center  p-3">
            <Title>after</Title>

            <ul
              className={`h-[90vh] w-full  ${
                getAfterList(sticks).length > 0 ? "overflow-y-auto" : ""
              } `}
            >
              {getAfterList(sticks).map((stick) => {
                return (
                  <li
                    key={stick.id}
                    className={`border-b-2 pb-2 border-color-text-gray flex flex-col w-full py-2 shadow-sm
                `}
                  >
                    {isKnowToday(stick) && <FcApproval size={40} />}
                    {isMistakeToday(stick) && <FcDisapprove size={40} />}
                    <div className="w-full flex items-center gap-2">
                      <div>{stick.name}</div>
                      <div>({stick.answers.length})</div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
})
export default Practice

const Title: FC<TitleProps> = ({ children }) => {
  return (
    <h1 className="flex items-center justify-center font-semibold text-xl underline mb-4 mt-2 ">
      {children}
    </h1>
  )
}

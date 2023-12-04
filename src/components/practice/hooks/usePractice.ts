import * as API from "@/api/sticks"
import { Stick } from "@/api/sticks/interfaces"
import { UserAuth } from "@/context/AuthContext"
import { ModalStore } from "@/mobx/modalStore"
import { modals } from "@/util"
import { useRouter } from "next/navigation"

import { useEffect, useState } from "react"
import useSound from "./useSound"

const usePractice = (categoryId: string, isAnsweredToday: any) => {
  const { sound, stopSound, playSound } = useSound("/sounds/win.wav")
  const {
    sound: sYeah,
    stopSound: stopYeah,
    playSound: playYeah,
  } = useSound("/sounds/yeah.mp3")
  const router = useRouter()
  const { user } = UserAuth()
  const [sticks, setSticks] = useState<Stick[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [successInRow, setSuccessInRow] = useState(0)
  const [isShowImage, setIsShowImage] = useState(false)

  useEffect(() => {
    if (user) {
      API.getSticks(user, categoryId).then((dbSticks) => {
        console.log(dbSticks)
        setSticks(dbSticks)
        setIsLoading(false)
      })
    }
  }, [user])
  useEffect(() => {
    if (sticks.length > 0 && !hasStickToAnswer()) {
      playSound()
      ModalStore.openModal(modals.success)
    }
  }, [sticks])
  useEffect(() => {
    if (successInRow === 3) {
      playYeah()
      setIsShowImage(true)
      setSuccessInRow(0)
    }
  }, [successInRow])

  const hasStickToAnswer = () => {
    return sticks.filter((stick) => !isAnsweredToday(stick)).length > 0
  }

  return {
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
  }
}

export default usePractice

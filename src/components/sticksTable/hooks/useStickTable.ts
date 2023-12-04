import { UserAuth } from "@/context/AuthContext"
import { Timestamp } from "firebase/firestore"
import { useRouter } from "next/navigation"
import React, { FC, useEffect, useState } from "react"

import { Order, TableObj } from "./interfaces"
import * as API from "@/api/sticks"
import { Stick } from "@/api/sticks/interfaces"

const useStickTable = (categoryId: string) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [chosenStick, setChosenStick] = useState<Stick>({
    id: "",
    name: "",
    date: Timestamp.now(),
    answers: [],
  })
  const { user } = UserAuth()
  const [sortingObj, setSortingObj] = useState<TableObj>({
    name: Order.asc,
    date: Order.asc,
  })

  const [sticks, setSticks] = useState<Stick[]>([])

  useEffect(() => {
    if (user) {
      API.getSticks(user, categoryId).then((dbSticks: any) => {
        console.log(dbSticks)
        setSticks(dbSticks)
        setIsLoading(false)
      })
    }
  }, [user])

  return {
    user,
    setSticks,
    sticks,
    chosenStick,
    setIsLoading,
    router,
    sortingObj,
    setSortingObj,
    isLoading,
    setChosenStick,
  }
}

export default useStickTable

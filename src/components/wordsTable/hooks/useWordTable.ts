import { UserAuth } from "@/context/AuthContext"
import { Timestamp } from "firebase/firestore"
import { useRouter } from "next/navigation"
import React, { FC, useEffect, useState } from "react"
import { Order, TableObj } from "./interfaces"
import appStore from "@/mobx/appStore"

const useWordTable = (categoryId: string) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  const { user } = UserAuth()
  const [sortingObj, setSortingObj] = useState<TableObj>({
    name: Order.asc,
    date: Order.asc,
  })

  useEffect(() => {
    if (user) {
      appStore.getWords(user, categoryId)
    }
  }, [user, categoryId])

  return {
    user,
    setIsLoading,
    router,
    sortingObj,
    setSortingObj,
    isLoading,
  }
}

export default useWordTable

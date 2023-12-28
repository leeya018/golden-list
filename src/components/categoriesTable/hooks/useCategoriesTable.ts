import { Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { TableObj, Order } from "./interfaces"
import { UserAuth } from "@/context/AuthContext"
import { Category } from "@/api/categories/interfaces"
import { useRouter } from "next/navigation"
import { getCategories } from "@/api/categories"
import appStore from "@/mobx/appStore"

const useCategoriesTable = () => {
  const [sortingObj, setSortingObj] = useState<TableObj>({
    name: Order.asc,
    date: Order.asc,
  })
  const { user } = UserAuth()

  // const [isLoading, setIsLoading] = useState<Boolean>(true)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      console.log("object")
      console.log(user)
      appStore.getCategories(user)
    }
  }, [user])

  return {
    router,

    user,
    sortingObj,
    setSortingObj,
  }
}

export default useCategoriesTable

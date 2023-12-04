import { Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { TableObj, Order } from "./interfaces"
import { UserAuth } from "@/context/AuthContext"
import { Category } from "@/api/categories/interfaces"
import { useRouter } from "next/navigation"
import { getCategories } from "@/api/categories"

const useCategoriesTable = () => {
  const [sortingObj, setSortingObj] = useState<TableObj>({
    name: Order.asc,
    date: Order.asc,
  })
  const { user } = UserAuth()

  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [chosenCategory, setChosenCategory] = useState<Category>({
    id: "",
    name: "",
    date: Timestamp.now(),
    bgColor: "",
  })

  const router = useRouter()

  useEffect(() => {
    if (user) {
      console.log("object")
      console.log(user)
      setIsLoading(true)
      getCategories(user)
        .then((dbCategories) => {
          setCategories(dbCategories)
          setIsLoading(false)
        })
        .catch((error) => {
          setIsLoading(false)
        })
    }
  }, [user])
  return {
    router,
    chosenCategory,
    setChosenCategory,
    categories,
    setCategories,
    isLoading,
    setIsLoading,
    user,
    sortingObj,
    setSortingObj,
  }
}

export default useCategoriesTable

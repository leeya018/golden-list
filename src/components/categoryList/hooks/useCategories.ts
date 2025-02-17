import { Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { UserAuth } from "@/context/AuthContext"
import { Category } from "@/api/categories/interfaces"
import { useRouter } from "next/navigation"
import { getCategories } from "@/api/categories"
import appStore from "@/mobx/appStore"

const useCategories = () => {
  const { user } = UserAuth()

  const [isLoading, setIsLoading] = useState<Boolean>(true)

  useEffect(() => {
    if (user) {
      console.log("object")
      console.log(user)
      appStore.getCategories(user).then(() => {
        if (appStore.categories.length > 0) {
          const firstCat = appStore.categories[0]
          appStore.setChosenCategory(firstCat)
          appStore.getWords(user, firstCat.id)
        }
      })

      setIsLoading(true)
    }
  }, [user])
  return {
    isLoading,
    setIsLoading,
    user,
  }
}

export default useCategories

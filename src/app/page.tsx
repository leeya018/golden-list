"use client"
import { db } from "@/firebase"
import { observer } from "mobx-react-lite"
import { UserAuth } from "@/context/AuthContext"
import { useEffect } from "react"
import appStore from "@/mobx/appStore"
import { NavNames } from "@/util"
import { useRouter } from "next/navigation"

const MainPage = observer(() => {
  const { user } = UserAuth()
  const router = useRouter()
  useEffect(() => {
    // appStore.getCategories(user)
    router.push(`/${NavNames.home}`)
  }, [])

  return (
    <div className="relative flex min-h-screen bg-white  ">
      <div className="flex justify-center items-center w-full text-9xl font-bold rotate-45">
        make it stick
      </div>
    </div>
  )
})
export default MainPage

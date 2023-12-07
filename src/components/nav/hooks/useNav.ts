import React, { useState, useEffect } from "react"
import { UserAuth } from "@/context/AuthContext"
import { NavNames } from "@/util"
import { useRouter } from "next/navigation"

const useNav = () => {
  const [navName, setNavName] = useState<string>(NavNames.home)
  const router = useRouter()
  const { user, logOut } = UserAuth()
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  useEffect(() => {
    if (!user) {
      // router.push(`/${NavNames.login}`)
    }
  }, [user])

  return { navName, setNavName, router, user, logOut, isLoading, setIsLoading }
}

export default useNav

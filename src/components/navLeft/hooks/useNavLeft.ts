import { UserAuth } from "@/context/AuthContext"
import { NavNames } from "@/util"
import { useRouter } from "next/navigation"

import React, { useState } from "react"

const useNavLeft = () => {
  const [navName, setNavName] = useState<string>(NavNames.home)
  const router = useRouter()
  const { user, logOut } = UserAuth()
  const [isLoading, setIsLoading] = useState<Boolean>(false)

  return { navName, setNavName, router, user, logOut, isLoading, setIsLoading }
}

export default useNavLeft

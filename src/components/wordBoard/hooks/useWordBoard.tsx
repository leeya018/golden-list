import { Word } from "@/api/words/interfaces"
import { UserAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react"

const useWordBoard = () => {
  const { user } = UserAuth()

  return {
    user,
  }
}

export default useWordBoard

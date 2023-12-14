import { Word } from "@/api/words/interfaces"
import { UserAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react"

const useWordBoardItem = (word: Word) => {
  const { user } = UserAuth()
  const [chosenSlice, setChosenSlice] = useState("")
  const [hints, setHints] = useState(-1)
  const [isMyHint, setIsMyHint] = useState(false)

  useEffect(() => {
    const tLen = word.translate.length
    if (hints === 0) {
      setChosenSlice(Array(tLen).fill("_").join(" "))
    } else if (hints > 0) {
      console.log(hints, word.translate.slice(0, hints))
      setChosenSlice(
        word.translate.slice(0, hints) +
          Array(tLen - hints)
            .fill("_")
            .join(" ")
      )
    }
  }, [hints])

  const increaseHint = () => {
    if (hints === word.translate.length) return
    setHints((prev) => prev + 1)
  }

  return {
    user,
    hints,
    increaseHint,
    chosenSlice,
    setIsMyHint,
    isMyHint,
  }
}

export default useWordBoardItem

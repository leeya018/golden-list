import { Word } from "@/api/words/interfaces"
import { useEffect, useState } from "react"

const useWordModal = (chosenWord: Word | null) => {
  const [name, setName] = useState<string>("")
  const [translate, setTranslate] = useState<string>("")
  const [type, setType] = useState<string>("")
  const [hint, setHint] = useState<string>("")

  useEffect(() => {
    if (chosenWord) {
      setName(chosenWord.name)
      setTranslate(chosenWord.translate)
      setType(chosenWord.type)
      setHint(chosenWord.hint)
    }
  }, [chosenWord])

  return {
    name,
    setName,
    translate,
    setTranslate,
    type,
    setType,
    hint,
    setHint,
  }
}

export default useWordModal

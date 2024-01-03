import { Word } from "@/api/words/interfaces"
import { WordsPracticeMode } from "@/util"
import { observer } from "mobx-react-lite"
import { FC, useEffect, useState } from "react"
import { WordPracticeItemActionProps } from "./interfaces"
import WordPracticeItem from "."

const WordPracticeItemClick: FC<WordPracticeItemActionProps> = observer(
  ({ word, isFlipped }) => {
    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
      setIsShow(isFlipped)
    }, [isFlipped])

    return (
      <WordPracticeItem
        onClick={() => setIsShow((prev) => !prev)}
        word={word}
        isShow={isShow}
        isShowTop={true}
      />
    )
  }
)

export default WordPracticeItemClick

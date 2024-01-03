import { Word } from "@/api/words/interfaces"
import { WordsPracticeMode } from "@/util"
import { observer } from "mobx-react-lite"
import { FC, useEffect, useState } from "react"
import {
  WordPracticeItemActionProps,
  WordPracticeItemProps,
} from "./interfaces"
import WordPracticeItem from "."

const WordPracticeItemHover: FC<WordPracticeItemActionProps> = observer(
  ({ word, isFlipped }) => {
    const [isHover, setIsHover] = useState(false)

    useEffect(() => {
      setIsHover(isFlipped)
    }, [isFlipped])

    const getOnMouseLeave = () => {
      return isFlipped ? () => setIsHover(true) : () => setIsHover(false)
    }
    const getOnMouseEnter = () => {
      return isFlipped ? () => setIsHover(false) : () => setIsHover(true)
    }
    return (
      <WordPracticeItem
        onMouseEnter={getOnMouseEnter()}
        onMouseLeave={getOnMouseLeave()}
        isShow={isHover}
        word={word}
        isShowTop={false}
      />
    )
  }
)

export default WordPracticeItemHover

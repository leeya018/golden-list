import { Word } from "@/api/words/interfaces"
import { WordsPracticeMode } from "@/util"
import { observer } from "mobx-react-lite"
import { FC, useEffect, useState } from "react"
import {
  WordPracticeItemActionProps,
  WordPracticeItemProps,
} from "./interfaces"
import WordPracticeItem from "."

const WordPracticeItemFocus: FC<WordPracticeItemActionProps> = observer(
  ({ word, isFlipped }) => {
    const [isFocus, setIsFocus] = useState(false)

    useEffect(() => {
      setIsFocus(isFlipped)
    }, [isFlipped])

    const getOnMouseUp = () => {
      return isFlipped ? () => setIsFocus(true) : () => setIsFocus(false)
    }
    const getOnMouseDown = () => {
      return isFlipped ? () => setIsFocus(false) : () => setIsFocus(true)
    }
    return (
      <WordPracticeItem
        onMouseDown={getOnMouseDown()}
        onMouseUp={getOnMouseUp()}
        isShow={isFocus}
        word={word}
        isShowTop={true}
      />
    )
  }
)

export default WordPracticeItemFocus

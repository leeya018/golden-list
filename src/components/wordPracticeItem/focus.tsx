import { Word } from "@/api/words/interfaces"
import { WordsPracticeMode } from "@/util"
import { observer } from "mobx-react-lite"
import { FC, useState } from "react"
import {
  WordPracticeItemActionProps,
  WordPracticeItemProps,
} from "./interfaces"
import WordPracticeItem from "."

const WordPracticeItemFocus: FC<WordPracticeItemActionProps> = observer(
  ({ word }) => {
    const [isFocus, setIsFocus] = useState(false)

    return (
      <WordPracticeItem
        onMouseDown={(e: any) => {
          setIsFocus(true)
        }}
        onMouseUp={() => setIsFocus(false)}
        isShow={isFocus}
        word={word}
        isShowTop={true}
      />
    )
  }
)

export default WordPracticeItemFocus

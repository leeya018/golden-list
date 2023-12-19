import { Word } from "@/api/words/interfaces"
import { WordsPracticeMode } from "@/util"
import { observer } from "mobx-react-lite"
import { FC, useState } from "react"
import {
  WordPracticeItemActionProps,
  WordPracticeItemProps,
} from "./interfaces"
import WordPracticeItem from "."

const WordPracticeItemHover: FC<WordPracticeItemActionProps> = observer(
  ({ word }) => {
    const [isHover, setIsHover] = useState(false)

    return (
      <WordPracticeItem
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        isShow={isHover}
        word={word}
        isShowTop={false}
      />
    )
  }
)

export default WordPracticeItemHover

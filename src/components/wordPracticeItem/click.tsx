import { Word } from "@/api/words/interfaces"
import { WordsPracticeMode } from "@/util"
import { observer } from "mobx-react-lite"
import { FC, useState } from "react"
import { WordPracticeItemActionProps } from "./interfaces"
import WordPracticeItem from "."

const WordPracticeItemClick: FC<WordPracticeItemActionProps> = observer(
  ({ word }) => {
    const [isShow, setIsShow] = useState(false)

    return (
      <WordPracticeItem
        onClick={() => setIsShow((prev) => !prev)}
        word={word}
        isShowTop={true}
      />
    )
  }
)

export default WordPracticeItemClick

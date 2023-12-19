import { observer } from "mobx-react-lite"
import { FC } from "react"
import appStore from "@/mobx/appStore"
import { WordBoardProps } from "./hooks/interfaces"
import { WordsPracticeMode } from "@/util"
import WordPracticeItemClick from "../wordPracticeItem/click"
import WordPracticeItemFocus from "../wordPracticeItem/focus"
import WordPracticeItemHover from "../wordPracticeItem/hover"

const WordBoard: FC<WordBoardProps> = observer(({ practiceMode }) => {
  return (
    <div className="border-2 w-full h-screen p-2 ">
      {appStore.words.length === 0 && (
        <div className="w-full text-center">List is Empty</div>
      )}

      <div
        className="px-2 flex-1 overflow-y-auto w-full
        h-screen grid grid-cols-6 "
      >
        {[...appStore.words].map((word, key) => (
          <>
            {practiceMode === WordsPracticeMode.click && (
              <WordPracticeItemClick key={key} word={word} />
            )}
            {practiceMode === WordsPracticeMode.focus && (
              <WordPracticeItemFocus key={key} word={word} />
            )}
            {practiceMode === WordsPracticeMode.hover && (
              <WordPracticeItemHover key={key} word={word} />
            )}
          </>
        ))}
      </div>
    </div>
  )
})

export default WordBoard

import { observer } from "mobx-react-lite"
import { FC } from "react"
import appStore from "@/mobx/appStore"
import { WordBoardProps } from "./hooks/interfaces"
import { WordsPracticeMode } from "@/util"
import WordPracticeItemClick from "../wordPracticeItem/click"
import WordPracticeItemFocus from "../wordPracticeItem/focus"
import WordPracticeItemHover from "../wordPracticeItem/hover"

const WordBoard: FC<WordBoardProps> = observer(
  ({ practiceMode, isFlipped }) => {
    return (
      <div className="border-2 w-full   p-2 ">
        {appStore.words.length === 0 && (
          <div className="w-full text-center">List is Empty</div>
        )}

        <div
          className="px-2 w-full
         grid grid-cols-6 gap-2"
        >
          {/* {[...appStore.words, ...appStore.words, ...appStore.words].map( */}
          {[...appStore.words].map((word, key) => (
            <>
              {practiceMode === WordsPracticeMode.click && (
                <WordPracticeItemClick
                  key={key}
                  word={word}
                  isFlipped={isFlipped}
                />
              )}
              {practiceMode === WordsPracticeMode.focus && (
                <WordPracticeItemFocus
                  key={key}
                  word={word}
                  isFlipped={isFlipped}
                />
              )}
              {practiceMode === WordsPracticeMode.hover && (
                <WordPracticeItemHover
                  key={key}
                  word={word}
                  isFlipped={isFlipped}
                />
              )}
            </>
          ))}
        </div>
      </div>
    )
  }
)

export default WordBoard

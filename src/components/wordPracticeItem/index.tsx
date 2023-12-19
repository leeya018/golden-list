import { observer } from "mobx-react-lite"
import { WordPracticeItemProps } from "./interfaces"
import { FC, useState } from "react"
import TopBoardItem from "../topBoardItem"
import useWordBoardItem from "../wordBoard/hooks/useWordBoardItem"

const WordPracticeItem: FC<WordPracticeItemProps> = observer(
  ({ word, isShowTop = true, isShow, ...rest }) => {
    const { chosenSlice, hints, increaseHint, setIsMyHint, isMyHint } =
      useWordBoardItem(word)
    return (
      <div
        {...rest}
        className={`${
          isShow && "bg-color-disabled-gray"
        } relative cursor-pointer flex items-center
        justify-center h-44 border-2 rounded-md  `}
      >
        {isShowTop && (
          <TopBoardItem
            word={word}
            hints={hints}
            increaseHint={increaseHint}
            setIsMyHint={setIsMyHint}
            isMyHint={isMyHint}
          />
        )}
        <div className={`${isShow ? "hidden" : "flex"} text-xl font-semibold `}>
          {word.name}
        </div>
        <div
          className={`${isShow ? "flex" : "hidden"} text-xl  font-semibold `}
        >
          {word.translate}
        </div>
      </div>
    )
  }
)

export default WordPracticeItem

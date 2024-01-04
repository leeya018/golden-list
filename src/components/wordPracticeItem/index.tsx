import { observer } from "mobx-react-lite"
import { WordPracticeItemProps } from "./interfaces"
import { FC, useState } from "react"
import TopBoardItem from "../topBoardItem"
import useWordBoardItem from "../wordBoard/hooks/useWordBoardItem"
import { ModalStore } from "@/mobx/modalStore"
import { modals } from "@/util"
import appStore from "@/mobx/appStore"

const WordPracticeItem: FC<WordPracticeItemProps> = observer(
  ({ word, isShowTop = true, isShow, ...rest }) => {
    const { chosenSlice, hints, increaseHint, setIsMyHint, isMyHint } =
      useWordBoardItem(word)
    return (
      <div
        {...rest}
        className={`${
          isShow && "bg-color-disabled-gray"
        } relative cursor-pointer flex flex-col items-center
         h-44 border-2 rounded-md  `}
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
        <div
          className={`${
            isShow ? "hidden" : "flex"
          } mt-10 text-xl font-semibold `}
        >
          {word.name}
        </div>
        <div
          className={`${
            isShow ? "flex" : "hidden"
          } text-xl mt-10  font-semibold `}
        >
          {word.translate}
        </div>

        <div className={` text-xl font-semibold bg-color-blue `}>
          {chosenSlice}
        </div>
        {isMyHint && (
          <div className={` text-md font-semibold `}>{word.hint}</div>
        )}
        <div
          className={`absolute bottom-0 right-0 text-md font-semibold m-1`}
          onClick={(e: any) => {
            e.stopPropagation()
            appStore.setChosenWord(word)
            ModalStore.openModal(modals.editWord)
          }}
        >
          edit
        </div>
      </div>
    )
  }
)

export default WordPracticeItem

import { observer } from "mobx-react-lite"
import { TopBoardItemProps } from "./interfaces"
import { FC } from "react"
import useWordBoard from "../wordBoard/hooks/useWordBoard"
import selectModeStore from "@/mobx/selectModeStore"
import { Word } from "@/api/words/interfaces"
import appStore from "@/mobx/appStore"

import { IoAddOutline } from "react-icons/io5"
import { WordsPracticeMode } from "@/util"

const TopBoardItem: FC<TopBoardItemProps> = observer(
  ({ word, hints, increaseHint, isMyHint, setIsMyHint }) => {
    const { user } = useWordBoard()
    const { mainMode, practiceMode } = selectModeStore

    const editWord = (word: Word, num: number) => {
      console.log({ num })
      if (!appStore.chosenCategory?.id)
        throw new Error("You must choose a category")
      let categoryId = appStore.chosenCategory.id
      let dupWord = { ...word }
      dupWord.knows = word.knows + 1
      appStore.editWord(user, categoryId, dupWord)
    }
    return (
      <>
        <div className="absolute top-1 right-1 flex items-center gap-1 ">
          <IoAddOutline
            onMouseEnter={(e: any) => e.stopPropagation()}
            className="hover:scale-105"
            size={25}
            onClick={(e: any) => {
              e.stopPropagation()
              editWord(word, 1)
            }}
          />
          <div className="">({word.knows})</div>
        </div>

        {practiceMode !== WordsPracticeMode.hover && (
          <div
            className="absolute bottom-1 left-1"
            onClick={(e: any) => {
              e.stopPropagation()
              increaseHint()
            }}
            onMouseDown={(e: any) => e.stopPropagation()}
          >
            hint me ({hints})
          </div>
        )}
        {practiceMode !== WordsPracticeMode.hover && word.hint && !isMyHint && (
          <div
            className="absolute top-1 left-1"
            onClick={(e: any) => {
              e.stopPropagation()
              setIsMyHint(true)
            }}
          >
            my hint
          </div>
        )}
      </>
    )
  }
)

export default TopBoardItem

import { observer } from "mobx-react-lite"
import { FC, useState, useEffect } from "react"
// import { WordItemProps, WordBoardItemProps } from "./hooks/interfaces"
import { Word } from "@/api/words/interfaces"
import appStore from "@/mobx/appStore"
import { IoAddOutline } from "react-icons/io5"
import * as ApiWords from "@/api/words"

import {
  TopBoardItemProps,
  WordBoardItemProps,
  WordBoardProps,
} from "./hooks/interfaces"
import useWordBoard from "./hooks/useWordBoard"
import { WordsPracticeMode } from "@/util"
import useWordBoardItem from "./hooks/useWordBoardItem"
import selectModeStore from "@/mobx/selectModeStore"
const arr = [
  {
    id: "89sl89234lkjt984jkltc8934",
    name: "что",
    translate: "what",
    type: "shto",
    hint: "drink the water",
    knows: 0,
  },
  {
    id: "89sl89234lkjt984jkltc4934",
    name: "Как вы",
    translate: "how are you",
    type: "kak dila",
    hint: "חרא של דיל",
    knows: 0,
  },
  {
    id: "89sl89234lkjt984jkltc2934",
    name: "почему",
    translate: "why",
    type: "pachimu",
    hint: "pahsa is doing a muuuu",
    knows: 0,
  },
  {
    id: "89sl89234lkjt984jkltc7934",
    name: "черный",
    translate: "black",
    type: "chernyy",
    hint: "שירים של ני",
    knows: 0,
  },

  {
    id: "8mx9834lkj8lkcu4y84jkltc7934",
    hint: "3tsrt של ני",
    knows: 0,
    name: "Ресторан",
    translate: "Restaurant",
    type: "Restoran",
  },
  {
    id: "8mx9834lkj8lkcuy284jkltc7934",
    hint: "ttsrdt של ני",
    knows: 0,
    name: "Меню",
    translate: "Menu",
    type: "Menyu",
  },
  {
    id: "8mx9834l6kj8lkcuy84jkltc7934",
    hint: "rrr של ני",
    knows: 0,
    name: "Официант",
    translate: "Waiter",
    type: "Ofitsiant",
  },
  {
    id: "8mx9834lkj8lkcuy842jkltc7934",
    hint: "c3c של ני",
    knows: 0,
    name: "Официантка",
    translate: "Waitress",
    type: "Ofitsiantka",
  },
  {
    id: "8mx9834lkj8lk8cuy84jkltc7934",
    hint: "שירים c43dts ני",
    knows: 0,
    name: "Заказ",
    translate: "Order",
    type: "Zakaz",
  },
  {
    id: "8mx9834lkj8lkc1uy84jkltc7934",
    hint: "c34 של ני",
    knows: 0,
    name: "Столик",
    translate: "Table",
    type: "Stolik",
  },
  {
    id: "8mx9834lkj8lkcu88y84jkltc7934",
    hint: "32 של ני",
    knows: 0,
    name: "Счёт",
    translate: "Bill",
    type: "Schyot",
  },
  {
    id: "8mx9834lkj8lkcuy284jkltc7934",
    hint: "t34 של ני",
    knows: 0,
    name: "Чаевые",
    translate: "Tip",
    type: "Chaevye",
  },
  {
    id: "8mx9834l1kj8lkcuy84jkltc7934",
    hint: "w3pg של ני",
    knows: 0,
    name: "Блюдо",
    translate: "Dish",
    type: "Blyudo",
  },
  {
    id: "8mx9834lkj8lkc8uy84jkltc7934",
    hint: "t4w של ני",
    knows: 0,
    name: "Напиток",
    translate: "Drink",
    type: "Napitok",
  },
]
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
        {/* {[...appStore.words]. */}
        {[...appStore.words]
          .sort((w1, w2) => w1.knows - w2.knows)
          .map((word, key) => (
            <>
              {practiceMode === WordsPracticeMode.click && (
                <WordBoardItemClick key={key} word={word} />
              )}
              {practiceMode === WordsPracticeMode.focus && (
                <WordBoardItemFocus key={key} word={word} />
              )}
              {practiceMode === WordsPracticeMode.hover && (
                <WordBoardItemHover key={key} word={word} />
              )}
            </>
          ))}
      </div>
    </div>
  )
})

export default WordBoard

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
        <IoAddOutline
          onMouseEnter={(e) => e.stopPropagation()}
          className="absolute top-1 right-1 hover:scale-105"
          size={25}
          onClick={() => editWord(word, 1)}
        />
        <div className="absolute top-1 left-1">{word.knows}</div>
        {practiceMode !== WordsPracticeMode.hover && (
          <div
            className="absolute bottom-1 left-1"
            onClick={(e) => {
              e.stopPropagation()
              increaseHint()
            }}
          >
            hint me ({hints})
          </div>
        )}
        {practiceMode !== WordsPracticeMode.hover && word.hint && (
          <div
            className="absolute bottom-1 right-1"
            onClick={(e) => {
              e.stopPropagation()
              setIsMyHint((prev) => !prev)
            }}
          >
            my hint
          </div>
        )}
      </>
    )
  }
)

const WordBoardItemClick: FC<WordBoardItemProps> = observer(({ word }) => {
  const [isShow, setIsShow] = useState(false)
  const { chosenSlice, hints, increaseHint, setIsMyHint, isMyHint } =
    useWordBoardItem(word)

  return (
    <div
      onClick={() => setIsShow((prev) => !prev)}
      className="boardItem flex flex-col border-2 rounded-md"
    >
      <TopBoardItem
        word={word}
        hints={hints}
        increaseHint={increaseHint}
        setIsMyHint={setIsMyHint}
        isMyHint={isMyHint}
      />
      <div className={`${isShow ? "hidden" : "flex"} text-xl font-semibold `}>
        {word.name}
      </div>
      <div className={`${isShow ? "flex" : "hidden"} text-xl font-semibold `}>
        {word.translate}
      </div>
      <div className={` text-xl font-semibold `}>{chosenSlice}</div>
      {isMyHint && <div className={` text-xl font-semibold `}>{word.hint}</div>}
    </div>
  )
})
const WordBoardItemFocus: FC<WordBoardItemProps> = observer(({ word }) => {
  const [isFocus, setIsFocus] = useState(false)
  const { chosenSlice, hints, increaseHint, setIsMyHint, isMyHint } =
    useWordBoardItem(word)
  return (
    <div
      onMouseDown={() => setIsFocus(true)}
      onMouseUp={() => setIsFocus(false)}
      className="boardItem"
    >
      <TopBoardItem
        word={word}
        hints={hints}
        increaseHint={increaseHint}
        setIsMyHint={setIsMyHint}
        isMyHint={isMyHint}
      />
      <div className={`${isFocus ? "hidden" : "flex"} text-xl font-semibold `}>
        {word.name}
      </div>
      <div className={`${isFocus ? "flex" : "hidden"} text-xl font-semibold `}>
        {word.translate}
      </div>
      <div className={` text-xl font-semibold `}>{chosenSlice}</div>
      {isMyHint && <div className={` text-xl font-semibold `}>{word.hint}</div>}
    </div>
  )
})
const WordBoardItemHover: FC<WordBoardItemProps> = observer(({ word }) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="boardItem"
    >
      <TopBoardItem word={word} />
      <div className={`${isHover ? "hidden" : "flex"} text-xl font-semibold `}>
        {word.name}
      </div>
      <div className={`${isHover ? "flex" : "hidden"} text-xl font-semibold `}>
        {word.translate}
      </div>
    </div>
  )
})

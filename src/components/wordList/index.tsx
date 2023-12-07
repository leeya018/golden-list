import { observer } from "mobx-react-lite"
import { FC, useState, useEffect } from "react"
import { WordItemProps, WordListItemProps } from "./hooks/interfaces"
import { Word } from "@/api/words/interfaces"
import appStore from "@/mobx/appStore"

const WordList: FC = observer(() => {
  return (
    <div className="border-2 w-1/4 p-2">
      <div className="flex flex-col min-w-full h-screen">
        <h1 className="font-semibold text-xl text-center mb-2 p-1">
          words list
        </h1>
        <ul
          className="px-2 flex-1 overflow-y-auto
   overflow-x-hidden w-full flex flex-col 
  items-center justify-start gap-2 "
        >
          {[...appStore.words]
            .sort((w1, w2) => w1.knows - w2.knows)
            .map((word, key) => (
              <WordListItem key={key} word={word} />
            ))}
        </ul>
      </div>
    </div>
  )
})

export default WordList

const WordListItem: FC<WordListItemProps> = observer(({ word }) => {
  const handleWordClick = (w: Word) => {
    appStore.setChosenWord(w)
  }

  return (
    <li
      onClick={() => handleWordClick(word)}
      className={`flex flex-col border-2 w-full  gap-2 p-5 rounded-md  cursor-pointer 
          ease-in-out duration-200 hover:bg-color-purple hover:bg-opacity-10 ${
            appStore.chosenWord?.id === word.id
              ? "bg-color-purple hover:bg-opacity-100"
              : "bg-opacity-0"
          }`}
    >
      <div className="text-xl font-semibold">{word.name}</div>
      <div>knows: {word.knows}</div>
    </li>
  )
})

"use client"

import { Word } from "@/api/words/interfaces"
import { ModalStore } from "@/mobx/modalStore"
import ViewModal from "@/ui/modal/word/view"
import PrimaryButton from "@/ui/button/primary"
import { WordsMode, modals } from "@/util"
// import { UserAuth } from "@/context/AuthContext"
import { observer } from "mobx-react-lite"
import { FC, useState, useEffect } from "react"
import { FcApproval } from "react-icons/fc"

const wordsData_old = [
  {
    id: "t09wlum0t3920239",
    name: "что",
    translate: "what",
    type: "shto",
    hint: "drink the water",
    knows: 0,
  },
  {
    id: "t09wlum0t3920231",
    name: "Как вы",
    translate: "how are you",
    type: "kak dila",
    hint: "חרא של דיל",
    knows: 0,
  },
  {
    id: "t09wlum0t3920232",
    name: "почему",
    translate: "why",
    type: "pachimu",
    hint: "pahsa is doing a muuuu",
    knows: 0,
  },
  {
    id: "t09wlum0t3920233",
    name: "черный",
    translate: "black",
    type: "chernyy",
    hint: "שירים של ני",
    knows: 0,
  },
  {
    id: "t09wlum0t3920234",
    name: "красный",
    translate: "red",
    type: "krasnyy",
    hint: "karas to the knee make the blood red",
    knows: 0,
  },
  {
    id: "t09wlum0t3920235",
    name: "синий",
    translate: "blue",
    type: "siniy",
    hint: "sini is not yellow , its blue",
    knows: 0,
  },
  {
    id: "t09wlum0t3920236",
    name: "фиолетовый",
    translate: "purple",
    type: "fioletovyy",
    hint: "violet with a v",
    knows: 0,
  },
]
const wordsData = [
  {
    name: "Ресторан",
    translate: "Restaurant",
    type: "Restoran",
    knows: 0,
    hint: "similar",
    id: Math.random(),
  },

  {
    name: "Меню",
    translate: "Menu",
    type: "Menyu",
    knows: 0,
    hint: "similar",
    id: Math.random(),
  },
  {
    name: "Официант",
    translate: "Waiter",
    type: "Ofitsiant",
    knows: 0,
    hint: "office",
    id: Math.random(),
  },
  {
    name: "Официантка",
    translate: "Waitress",
    type: "Ofitsiantka",
    knows: 0,
    hint: "office ka",
    id: Math.random(),
  },
  {
    name: "Заказ",
    translate: "Order",
    type: "Zakaz",
    knows: 0,
    hint: "zaaka to order",
    id: Math.random(),
  },
  {
    name: "Столик",
    translate: "Table",
    type: "Stolik",
    knows: 0,
    hint: "stool",
    id: Math.random(),
  },
  {
    name: "Счёт",
    translate: "Bill",
    type: "Schyot",
    knows: 0,
    hint: "bill is not stia",
    id: Math.random(),
  },
  {
    name: "Чаевые",
    translate: "Tip",
    type: "Chaevye",
    knows: 0,
    hint: "chai is a v for getting the tip",
    id: Math.random(),
  },
  {
    name: "Блюдо",
    translate: "Dish",
    type: "Blyudo",
    knows: 0,
    hint: "not dish can be hold with no hands",
    id: Math.random(),
  },
  {
    name: "Напиток",
    translate: "Drink",
    type: "Napitok",
    knows: 0,
    hint: "drink you take with napkin with tok tok",
    id: Math.random(),
  },
]
const TestPage = observer(() => {
  const [words, setWords] = useState(wordsData)
  const [chosenWord, setChosenWord] = useState<Word | undefined>(undefined)
  const [mode, setMode] = useState(WordsMode.show)

  console.log(chosenWord)
  useEffect(() => {
    console.log(chosenWord)
    console.log(words)
    return () => {}
  }, [chosenWord])
  return (
    <div className="relative flex min-h-screen bg-white w-full   flex-col">
      {/* {ModalStore.modalName === modals.viewWord && (
        <ViewModal
          onCancel={() => {
            ModalStore.closeModal()
          }}
          chosenWord={chosenWord as Word}
          title={"View Stick"}
        />
      )} */}
      <div className="w-full flex justify-center items-center gap-2 p-2">
        <label className="radio flex items-center gap-1">
          <input
            checked={WordsMode.show === mode}
            type="radio"
            name={WordsMode.show}
            onChange={() => setMode(WordsMode.show)}
          />
          {WordsMode.show}
        </label>
        <label className="radio flex items-center gap-1">
          <input
            checked={WordsMode.test === mode}
            type="radio"
            name={WordsMode.test}
            onChange={() => setMode(WordsMode.test)}
          />
          {WordsMode.test}
        </label>
      </div>
      <h1 className="flex justify-center p-2 font-bold text-lg underline">
        words to learn:
      </h1>
      <div className="flex flex-wrap justify-center items-start   gap-2 w-full mb-5">
        {words
          .sort((w1, w2) => w1.knows - w2.knows)
          .map((w, key) => (
            <li className="list-none" key={key}>
              <WordItem
                word={w}
                setChosenWord={setChosenWord}
                chosenWord={chosenWord as Word}
              />
            </li>
          ))}
      </div>
      {chosenWord && WordsMode.show === mode && (
        <WordView word={chosenWord as Word} />
      )}
      {chosenWord && WordsMode.test === mode && (
        <WordTest word={chosenWord as Word} setWords={setWords} words={words} />
      )}
      {/* <h1 className="flex justify-center p-2 font-bold text-lg underline">
        words I know:
      </h1>
      <div className="flex flex-wrap justify-center items-start   gap-2 w-full mb-5">
        {words
          .filter((w) => w.knows > 0)
          .map((w, key) => (
            <li className="list-none" key={key}>
              <WordItem
                word={w}
                setChosenWord={setChosenWord}
                chosenWord={chosenWord as Word}
              />
            </li>
          ))}
      </div> */}
    </div>
  )
})
export default TestPage

type WordItemProps = {
  word: Word
  chosenWord: Word
  setChosenWord: (word: Word) => void
}

const WordItem: FC<WordItemProps> = observer(
  ({ word, setChosenWord, chosenWord }) => {
    const handleClickWord = () => {
      setChosenWord(word)
      ModalStore.openModal(modals.viewWord)
    }
    return (
      <div
        onClick={handleClickWord}
        className={`outline-none flex flex-col items-start
        rounded-md p-2 border-2 shadow-sm list-none bg-color-gray 
        cursor-pointer hover:bg-color-orange hover:bg-opacity-25 ${
          chosenWord?.id == word.id ? "scale-110 bg-color-orange" : ""
        }`}
      >
        <h1 className="text-lg font-semibold mb-2">{word.name}</h1>
        <div className="flex items-center gap-2 ">
          <div>knows</div>
          <div>{word.knows}</div>
        </div>
      </div>
    )
  }
)

type WordViewProps = {
  word: Word
}
const WordView: FC<WordViewProps> = observer(({ word }) => {
  return (
    <div className="relative flex flex-col items-start justify-start border-2 mx-auto p-2 rounded-md shadow-sm">
      <div className="flex items-center justify-center  w-full font-bold text-2xl border-b-2 py-3 mb-2 ">
        {word.name}
      </div>

      <div
        className="rounded-md mt-5 p-2  
         border-color-text-gray pl-2
          placeholder:text-color-hover-gray 
          font-semibold placeholder:pl-2"
      >
        <span>Tranlation</span>: {word.translate}
      </div>
      <div
        className="rounded-md mt-5 p-2  
         border-color-text-gray pl-2
          placeholder:text-color-hover-gray 
          font-semibold placeholder:pl-2"
      >
        <span>Typeing</span>: {word.type}
      </div>
      <div
        className="rounded-md mt-5 p-2  
         border-color-text-gray pl-2
          placeholder:text-color-hover-gray 
          font-semibold placeholder:pl-2"
      >
        <span>Hint</span>: {word.hint}
      </div>
    </div>
  )
})
type WordTestProps = {
  word: Word
  words: Word[]
  setWords: (words: Word[]) => void
}
const WordTest: FC<WordTestProps> = observer(({ word, setWords, words }) => {
  const [hints, setHints] = useState(0)
  const [isShowTranslate, setIsShowTranslate] = useState(false)
  const [myGuess, setMyGuess] = useState("")

  useEffect(() => {
    setHints(0)
    setIsShowTranslate(false)
    setMyGuess("")
  }, [word.id])

  useEffect(() => {
    if (isEqual(myGuess, word.translate)) {
      const updatedWords = words.map((w) => {
        if (word.id === w.id) {
          return { ...w, knows: w.knows + 1 }
        }
        return w
      })
      console.log({ updatedWords })

      setWords(updatedWords)
    }
  }, [myGuess])

  const isEqual = (t1: string, t2: string) => {
    return t1.toLocaleLowerCase() === t2.toLowerCase()
  }

  const handleChange = (e) => {
    setMyGuess(e.target.value)
  }
  return (
    <div className="relative flex flex-col items-start justify-start border-2 mx-auto p-2 rounded-md shadow-sm">
      {isEqual(myGuess, word.translate) && (
        <FcApproval className="absolute bottom-1 right-1" size={85} />
      )}

      <div
        className="flex items-center justify-between  
      w-full  border-b-2 py-3 mb-2 "
      >
        <PrimaryButton
          onClick={() => setHints((prev) => prev + 1)}
          className=" top-1 right-1 "
        >
          Hint me
        </PrimaryButton>

        <div className="font-bold text-2xl">{word.name}</div>
        <div className=" top-1 left-1">hints:({hints})</div>
      </div>
      <div
        className="rounded-md mt-5 p-2  
         border-color-text-gray pl-2
          placeholder:text-color-hover-gray 
          font-semibold placeholder:pl-2 flex items-center gap-2"
      >
        <span>Tranlation</span>:{" "}
        <input
          type="text"
          value={myGuess}
          onChange={handleChange}
          className="border-2 rounded-md outline-none  focus:ring-color-blue pl-2"
        />
        <PrimaryButton
          onClick={() => setIsShowTranslate(true)}
          className=" top-1 right-1 "
        >
          Test
        </PrimaryButton>
      </div>
      {isShowTranslate && (
        <div className="text-md font-semibold text-color-green w-full flex justify-center items-center ">
          {word.translate}{" "}
        </div>
      )}
      <div
        className="rounded-md mt-5 p-2  
         border-color-text-gray pl-2
          placeholder:text-color-hover-gray 
          font-semibold placeholder:pl-2 flex justify-center items-center"
      >
        <span>Typeing : </span> {hints > 0 && <div> {word.type}</div>}
      </div>
      <div
        className="rounded-md mt-5 p-2  
         border-color-text-gray pl-2
          placeholder:text-color-hover-gray 
          font-semibold placeholder:pl-2 flex justify-center items-center"
      >
        <span>Hint : </span> {hints > 1 && <div> {word.hint}</div>}
      </div>
    </div>
  )
})

import { Word } from "@/api/words/interfaces"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { WordViewProps } from "./hooks/interfaces"
import appStore from "@/mobx/appStore"

const WordView: FC = observer(({}) => {
  return (
    <div className="w-3/4  flex justify-center ">
      <div
        className="relative  w-[80%] h-[30rem]
     flex flex-col items-center  justify-start gap-5
  border-2 rounded-md shadow-sm p-5 m-5"
      >
        <div
          className="flex items-center justify-center  
        w-full  border-b-2 py-3 mb-2  font-bold text-2xl"
        >
          {appStore.chosenWord?.name}
        </div>
        <div
          className="w-full rounded-md mt-5 p-2  
        border-color-text-gray pl-2
        placeholder:text-color-hover-gray 
        font-semibold placeholder:pl-2"
        >
          <span className="pr-2">Tranlation</span>:{" "}
          {appStore.chosenWord?.translate}
        </div>
        <div
          className=" w-full  rounded-md mt-5 p-2  
           border-color-text-gray pl-2
            placeholder:text-color-hover-gray 
            font-semibold placeholder:pl-2"
        >
          <span className="pr-2">Typeing</span>: {appStore.chosenWord?.type}
        </div>
        <div
          className="w-full  rounded-md mt-5 p-2  
        border-color-text-gray pl-2
            placeholder:text-color-hover-gray 
            font-semibold placeholder:pl-2"
        >
          <span className="pr-2">Hint</span>: {appStore.chosenWord?.hint}
        </div>
      </div>
    </div>
  )
})

export default WordView

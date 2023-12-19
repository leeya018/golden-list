import { observer } from "mobx-react-lite"
import { WordGptProps } from "./hooks/interfaces"
import { FC, useEffect, useState } from "react"
import InputCheckbox from "@/ui/inputBox/checbox"

const WordGpt: FC<WordGptProps> = observer(
  ({ word, removeFromChosen, addToChosen, gptWords }) => {
    const [isChecked, setIsChecked] = useState(false)

    useEffect(() => {
      setIsChecked(false)
    }, [gptWords])

    const handleChange = (word: any) => {
      const newIsChecked = !isChecked

      if (newIsChecked) addToChosen(word)
      else removeFromChosen(word)
      setIsChecked(newIsChecked)
    }
    return (
      <div className=" flex justify-center items-center  flex-col h-44 gap-2">
        <InputCheckbox
          checked={isChecked}
          onChange={() => handleChange(word)}
        />
        <div className="text-lg font-bold"> {word.name}</div>
        <div> {word.translate}</div>
        <div> {word.type}</div>
      </div>
    )
  }
)
export default WordGpt

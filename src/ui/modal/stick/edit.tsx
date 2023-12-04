import Image from "next/image"
import React, { FC, useEffect, useState } from "react"
import ColorList from "@/ui/ColorList"
import { observer } from "mobx-react-lite"
import Modal from ".."
import CloseButton from "@/ui/button/close"

import { Timestamp } from "firebase/firestore"
import { ModalStore } from "@/mobx/modalStore"
type Stick = {
  id: string
  name: string
  date: Timestamp
}
type ModalProps = {
  onCancel: any
  onEdit: any
  onRemove: any
  title: string
  chosenStick: Stick
}
const EditModal: FC<ModalProps> = observer(
  ({ onCancel, onRemove, onEdit, title, chosenStick }) => {
    const [chosenColor, setChosenColor] = useState<string>("")
    const [name, setName] = useState<string>("")

    useEffect(() => {
      setName(chosenStick?.name)
    }, [chosenStick])

    const handleClick = () => {
      if (!name) return
      onEdit(chosenStick.id, name)
      onCancel()
    }
    const handleRemove = () => {
      if (!name) return
      onRemove(chosenStick.id)
      onCancel()
    }
    return (
      <Modal>
        <CloseButton onClick={() => ModalStore.closeModal()} />
        {/* data */}
        <div className="relative p-5 flex flex-col items-center justify-start h-full f-full  ">
          <div className="flex items-center justify-start font-bold text-4xl border-b-2 py-3 mb-2 ">
            {title}
          </div>
          {/* inputs */}
          <div className="flex flex-col items-center justify-center mt-5">
            <div className="flex flex-col items-start justify-center gap-1">
              <label className="font-semibold text-color-text-gray" htmlFor="">
                Name
              </label>
              <textarea
                onChange={(e) => setName(e.target.value)}
                value={name}
                rows={5}
                cols={50}
                className="rounded-md p-2 border-2 
               border-color-text-gray pl-2
                placeholder:text-color-hover-gray 
                font-semibold placeholder:pl-2"
                placeholder="Add Stick Description"
              />
            </div>
          </div>
          {/* buttons */}
          <div className="relative bottom-0 flex items-center justify-end gap-2 font-semibold mt-auto">
            <button
              onClick={handleRemove}
              className="border-color-blue text-color-blue  border-2 rounded-md py-2 px-4 cursor-pointer"
            >
              REMOVE
            </button>
            <button
              onClick={handleClick}
              className="border-color-blue border-2 bg-color-blue text-color-white rounded-md py-2 px-4 cursor-pointer"
            >
              UPDATE
            </button>
          </div>
        </div>
      </Modal>
    )
  }
)
export default EditModal

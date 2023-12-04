import Image from "next/image"
import React, { FC, useEffect, useState } from "react"
import ColorList from "@/ui/ColorList"
import CloseButton from "@/ui/button/close"
import { observer } from "mobx-react-lite"
import Modal from ".."
import { Timestamp } from "firebase/firestore"
import { ModalStore } from "@/mobx/modalStore"
type Stick = {
  id: string
  name: string
  date: Timestamp
}
type ModalProps = {
  onCancel: any
  title: string
  chosenStick: Stick
}
const ViewModal: FC<ModalProps> = observer(
  ({ onCancel, title, chosenStick }) => {
    const [name, setName] = useState<string>("")

    useEffect(() => {
      setName(chosenStick?.name)
    }, [chosenStick])

    return (
      <Modal>
        <CloseButton onClick={() => ModalStore.closeModal()} />
        {/* data */}
        <div className="relative flex flex-col items-center justify-start h-full  w-full  ">
          <div className="flex items-center justify-start font-bold text-4xl border-b-2 py-3 mb-2 ">
            {title}
          </div>
          {/* inputs */}
          <div
            className="rounded-md mt-5 p-2  
               border-color-text-gray pl-2
                placeholder:text-color-hover-gray 
                font-semibold placeholder:pl-2"
          >
            {name}
          </div>
          {/* buttons */}
          <div className="relative bottom-0 flex items-center justify-center gap-2 font-semibold mt-auto">
            <button
              onClick={onCancel}
              className="border-color-blue border-2 bg-color-blue text-color-white rounded-md py-2 px-4 cursor-pointer"
            >
              CANCEL
            </button>
          </div>
        </div>
      </Modal>
    )
  }
)
export default ViewModal

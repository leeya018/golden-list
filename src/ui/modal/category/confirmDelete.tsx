import Image from "next/image"
import React, { FC, useEffect, useState } from "react"
import ColorList from "@/ui/ColorList"
import { observer } from "mobx-react-lite"
import Modal from ".."
import { Timestamp } from "firebase/firestore"
import { ModalStore } from "@/mobx/modalStore"
import CloseButton from "@/ui/button/close"
import { Category } from "@/api/categories/interfaces"

type ModalProps = {
  onCancel: any
  onClick: any
  title: string
  chosenCategory: Category
}
const ConfirmDeleteModal: FC<ModalProps> = observer(
  ({ onCancel, onClick, title, chosenCategory }) => {
    const [chosenColor, setChosenColor] = useState<string>("")

    const handleClick = () => {
      onClick(chosenCategory.id)
      onCancel()
    }
    return (
      <Modal>
        <CloseButton onClick={() => ModalStore.closeModal()} />
        <div className="flex flex-col items-center justify-center h-full  ">
          {/* data */}
          <div className="p-2 flex flex-col items-center justify-start h-full  ">
            <div className="text-center flex items-center justify-start font-bold text-4xl border-b-2 py-3 mb-2 ">
              {title}
            </div>
            {/* inputs */}
            <div className="flex flex-col items-center mt-5">
              are you sure you want to delete category: {chosenCategory.name}
            </div>
          </div>
          {/* buttons */}
          <div className="relative bottom-0 flex items-center justify-center gap-2 font-semibold mt-auto">
            <button
              onClick={onCancel}
              className="border-color-blue text-color-blue  border-2 rounded-md py-2 px-4 cursor-pointer"
            >
              CANCEL
            </button>
            <button
              onClick={handleClick}
              className="border-color-blue border-2 bg-color-blue text-color-white rounded-md py-2 px-4 cursor-pointer"
            >
              DELETE
            </button>
          </div>
        </div>
      </Modal>
    )
  }
)
export default ConfirmDeleteModal

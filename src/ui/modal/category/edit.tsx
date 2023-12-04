import React, { FC, useEffect, useState } from "react"
import ColorList from "@/ui/ColorList"
import { observer } from "mobx-react-lite"
import Modal from ".."
import { Category } from "@/api/categories/interfaces"
import CloseButton from "@/ui/button/close"
import { ModalStore } from "@/mobx/modalStore"

type ModalProps = {
  onCancel: any
  onEdit: any
  onRemove: any
  title: string
  chosenCategory: Category
}
const EditModal: FC<ModalProps> = observer(
  ({ onCancel, onRemove, onEdit, title, chosenCategory }) => {
    const [chosenColor, setChosenColor] = useState<string>("")
    const [name, setName] = useState<string>("")

    useEffect(() => {
      setName(chosenCategory?.name)
      setChosenColor(chosenCategory.bgColor)
    }, [chosenCategory])

    const handleClick = () => {
      if (!name) return
      onEdit(chosenCategory.id, name, chosenColor)

      onCancel()
    }
    const handleRemove = () => {
      onRemove(chosenCategory.id)
    }
    return (
      <Modal>
        <CloseButton onClick={() => ModalStore.closeModal()} />

        {/* data */}
        <div className="flex flex-col items-center justify-center h-full  ">
          <div className="flex items-center justify-start font-bold text-4xl border-b-2 py-3 mb-2 ">
            {title}
          </div>
          {/* inputs */}
          <div className="flex flex-col items-center mt-5">
            <div className="flex flex-col items-start gap-1">
              <label className="font-semibold text-color-text-gray" htmlFor="">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                className="rounded-md p-2 border-2 border-color-text-gray
                 pl-2 placeholder:text-color-hover-gray font-semibold placeholder:pl-2"
                placeholder="Category Name"
              />
            </div>

            <ColorList
              chosenColor={chosenColor}
              handleChosenColor={setChosenColor}
            />
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

import Image from "next/image"
import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import Modal from ".."
import { Timestamp } from "firebase/firestore"
import CloseButton from "@/ui/button/close"
import { ModalStore } from "@/mobx/modalStore"
import LabelInputItem from "@/ui/labelInputItem"
import useWordModal from "./hooks/useWordModal"

type ModalProps = {
  onCancel: any
  onClick: any
  title: string
}

const AddModal: FC<ModalProps> = observer(({ onCancel, onClick, title }) => {
  const {
    name,
    setName,
    translate,
    setTranslate,
    type,
    setType,
    hint,
    setHint,
  } = useWordModal(null)

  const inputRef = useRef<any>(null)

  const handleClick = () => {
    if (!name) return
    const typeA = type ? type : name
    const newWord = {
      name,
      translate,
      type: typeA,
      hint,
    }
    onClick(newWord)
    onCancel()
  }
  return (
    <Modal>
      <CloseButton onClick={() => ModalStore.closeModal()} />
      {/* data */}
      <div className="relative p-5 flex flex-col items-center justify-center h-full w-full">
        <div className="flex items-center justify-start font-bold text-4xl border-b-2 py-3 mb-2 ">
          {title}
        </div>
        {/* inputs */}
        <div className="flex flex-col items-center mt-5">
          <LabelInputItem
            inputRef={inputRef}
            onChange={(e) => setName(e.target.value)}
            value={name}
            title="Name"
          />
          <LabelInputItem
            onChange={(e) => setTranslate(e.target.value)}
            value={translate}
            title="Translate"
          />
          <LabelInputItem
            onChange={(e) => setHint(e.target.value)}
            value={hint}
            title="Hint"
          />
          <LabelInputItem
            onChange={(e) => setType(e.target.value)}
            value={type}
            title="Type"
          />
        </div>
        {/* buttons */}
        <div className="relative bottom-0 flex items-center justify-end gap-2 font-semibold mt-10">
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
            CONFIRM
          </button>
        </div>
      </div>
    </Modal>
  )
})
export default AddModal

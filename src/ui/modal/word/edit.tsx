import Image from "next/image"
import React, { FC, useEffect, useState } from "react"
import ColorList from "@/ui/ColorList"
import { observer } from "mobx-react-lite"
import Modal from ".."
import CloseButton from "@/ui/button/close"
import { ModalStore } from "@/mobx/modalStore"
import LabelInputItem from "@/ui/labelInputItem"
import { Word } from "@/api/words/interfaces"
import useWordModal from "./hooks/useWordModal"
import { Timestamp } from "firebase/firestore"

type ModalProps = {
  onCancel: any
  onEdit: any
  onRemove: any
  title: string
  chosenWord: Word
}
const EditModal: FC<ModalProps> = observer(
  ({ onCancel, onRemove, onEdit, title, chosenWord }) => {
    const {
      name,
      setName,
      translate,
      setTranslate,
      type,
      setType,
      hint,
      setHint,
    } = useWordModal(chosenWord)

    const handleClick = () => {
      if (!name) throw new Error("There is no name")
      const editedWord = {
        id: chosenWord.id,
        name: name || "",
        translate: translate || "",
        type: type || "",
        hint: hint || "",
        date: Timestamp.now(),
        knows: chosenWord.knows || 0,
      }
      onEdit(editedWord)
      onCancel()
    }
    const handleRemove = () => {
      onRemove()
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
            <div className="flex flex-col items-center mt-5">
              <LabelInputItem
                onChange={(e: any) => setName(e.target.value)}
                value={name}
                title="Name"
              />
              <LabelInputItem
                onChange={(e: any) => setTranslate(e.target.value)}
                value={translate}
                title="Translate"
              />
              <LabelInputItem
                onChange={(e: any) => setType(e.target.value)}
                value={type}
                title="Type"
              />
              <LabelInputItem
                onChange={(e: any) => setHint(e.target.value)}
                value={hint}
                title="Hint"
              />
            </div>
          </div>
          {/* buttons */}
          <div className="relative bottom-0 flex items-center justify-end gap-2 font-semibold mt-10">
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

import React, { FC, useState } from "react"
import Button from "."
import { ModalStore } from "@/mobx/modalStore"
import { modals } from "@/util"
import { BiEditAlt } from "react-icons/bi"
import { Word } from "@/api/words/interfaces"
import appStore from "@/mobx/appStore"

type ButtonPropType = {
  className: string
  word?: Word | null
}

const EditWord: FC<ButtonPropType> = ({ className, word }) => {
  return (
    <BiEditAlt
      size={25}
      className={`  cursor-pointer 
    hover:scale-150 ease-in-out duration-200 ${className}`}
      onClick={(e: any) => {
        e.stopPropagation()
        if (!word) throw new Error("cannot set word which is null")
        appStore.setChosenWord(word)
        ModalStore.openModal(modals.editWord)
      }}
    />
  )
}

export default EditWord

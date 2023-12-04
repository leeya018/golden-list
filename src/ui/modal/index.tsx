import Image from "next/image"
import React, { FC, useEffect, useState } from "react"
import ColorList from "@/ui/ColorList"
import { observer } from "mobx-react-lite"
import { ModalStore } from "@/mobx/modalStore"

type ModalProps = {
  children: React.ReactNode
}
const Modal: FC<ModalProps> = observer(({ children }) => {
  return (
    <div
      // onClick={() => ModalStore.closeModal()}
      className="absolute inset-0  z-50 h-full w-full border-2 bg-color-text-gray bg-opacity-30
       flex items-center justify-center
     "
    >
      <div
        className="absolute border-2  
       bg-color-white p-5 rounded-lg  flex items-center justify-center h-1/2  md:w-1/2 lg:w-1/3 "
      >
        {children}
      </div>
    </div>
  )
})
export default Modal

import { observer } from "mobx-react-lite"
import { FC, useState, useEffect } from "react"

import { FaChevronLeft } from "react-icons/fa6"
import { FaChevronRight } from "react-icons/fa6"
import { CategoriesProps } from "./hooks/interfaces"
import CategoryItem from "../categoryItem"
import filterStore from "@/mobx/filterStore"
import appStore from "@/mobx/appStore"
import PrimaryButton from "@/ui/button/primary"
import { ModalStore } from "@/mobx/modalStore"
import { modals } from "@/util"
import AddModal from "@/ui/modal/category/add"

const CategoryList: FC = observer(({}) => {
  return (
    <div className="w-full flex items-center ">
      {ModalStore.modalName === modals.addCategory && (
        <AddModal
          onCancel={() => {
            ModalStore.closeModal()
          }}
          onClick={appStore.addCategory}
          title={"Add Stick"}
        />
      )}

      <PrimaryButton
        onClick={() => ModalStore.openModal(modals.addCategory)}
        className={`justify-normal`}
      >
        Add Category
      </PrimaryButton>
      <ul className="w-full flex justify-center items-center gap-5 ">
        <FaChevronLeft />
        {appStore.categories
          .filter((c) =>
            c.name
              .toLocaleLowerCase()
              .includes(filterStore.search.toLocaleLowerCase())
          )
          .map((category, key) => (
            <CategoryItem key={key} category={category} />
          ))}
        <FaChevronRight />
      </ul>
    </div>
  )
})

export default CategoryList

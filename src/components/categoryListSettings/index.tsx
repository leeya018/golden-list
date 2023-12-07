import { observer } from "mobx-react-lite"
import { FC, useState, useEffect } from "react"

import { FaChevronLeft } from "react-icons/fa6"
import { FaChevronRight } from "react-icons/fa6"
import { CategoryItemSettingsProps } from "./hooks/interfaces"
import CategoryItem from "../categoryItem"
import filterStore from "@/mobx/filterStore"
import appStore from "@/mobx/appStore"
import PrimaryButton from "@/ui/button/primary"
import { ModalStore } from "@/mobx/modalStore"
import { modals } from "@/util"
import AddModal from "@/ui/modal/category/add"
import { MdEdit } from "react-icons/md"

const CategoryListSettings: FC = observer(({}) => {
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
            <CategoryItemSettings key={key} category={category} />
          ))}
        <FaChevronRight />
      </ul>
    </div>
  )
})

export default CategoryListSettings

const CategoryItemSettings: FC<CategoryItemSettingsProps> = observer(
  ({ category }) => {
    return (
      <li
        className={`${
          appStore.chosenCategory?.id === category.id
            ? "bg-color-gray-category"
            : ""
        } rounded-full p-5  hover:bg-color-gray-category cursor-pointer`}
        onClick={() => {
          appStore.setChosenCategory(category)
        }}
      >
        <div className="text-lg font-semibold flex items-center justify-center">
          {category.name}
        </div>
        <MdEdit
          size={45}
          onClick={() => ModalStore.openModal(modals.editCategory)}
        />
      </li>
    )
  }
)

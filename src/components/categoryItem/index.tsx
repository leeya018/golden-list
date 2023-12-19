import { observer } from "mobx-react-lite"
import { FC, useState, useEffect } from "react"
import { CategoryItemProps } from "./hooks/interfaces"
import { Category } from "@/api/categories/interfaces"
import appStore from "@/mobx/appStore"
import { UserAuth } from "@/context/AuthContext"

const CategoryItem: FC<CategoryItemProps> = observer(({ category }) => {
  const { user } = UserAuth()

  return (
    <li
      className={`${
        appStore.chosenCategory?.id === category.id ? "bg-color-purple " : ""
      } rounded-full px-4 py-2 duration-200 hover:bg-color-purple hover:bg-opacity-50 cursor-pointer`}
      onClick={() => {
        appStore.setChosenCategory(category)
        appStore.getWords(user, category.id)
      }}
    >
      <div className="text-lg font-semibold flex items-center justify-center">
        {category.name}
      </div>
    </li>
  )
})

export default CategoryItem

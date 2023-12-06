import { observer } from "mobx-react-lite"
import { FC, useState, useEffect } from "react"
import { CategoryItemProps } from "./hooks/interfaces"
import { Category } from "@/api/categories/interfaces"

const CategoryItem: FC<CategoryItemProps> = observer(
  ({ category, setChosenCategory, chosenCategory, setCategories }) => {
    const shuffle = () => {
      return array
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.name - b.name)
        .map((a) => a.value)
    }

    return (
      <li
        className={`${
          chosenCategory?.id === category.id ? "bg-color-gray-category" : ""
        } rounded-full px-4 py-2 hover:bg-color-gray-category cursor-pointer`}
        onClick={() => {
          setChosenCategory(category)
        }}
      >
        <div className="text-lg font-semibold flex items-center justify-center">
          {category.name}
        </div>
      </li>
    )
  }
)

export default CategoryItem

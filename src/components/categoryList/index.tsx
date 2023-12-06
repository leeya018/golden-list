import { observer } from "mobx-react-lite"
import { FC, useState, useEffect } from "react"

import { FaChevronLeft } from "react-icons/fa6"
import { FaChevronRight } from "react-icons/fa6"
import { CategoriesProps } from "./hooks/interfaces"
import CategoryItem from "../categoryItem"

const CategoryList: FC<CategoriesProps> = observer(
  ({ categories, setChosenCategory, chosenCategory }) => {
    return (
      <div className="w-full">
        <ul className="w-full flex justify-center items-center gap-5 ">
          <FaChevronLeft />
          {categories.map((category, key) => (
            <CategoryItem
              key={key}
              category={category}
              setChosenCategory={setChosenCategory}
              chosenCategory={chosenCategory}
            />
          ))}
          <FaChevronRight />
        </ul>
      </div>
    )
  }
)

export default CategoryList

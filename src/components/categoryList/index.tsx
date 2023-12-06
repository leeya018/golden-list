import { observer } from "mobx-react-lite"
import { FC, useState, useEffect } from "react"

import { FaChevronLeft } from "react-icons/fa6"
import { FaChevronRight } from "react-icons/fa6"
import { CategoriesProps } from "./hooks/interfaces"
import CategoryItem from "../categoryItem"
import filterStore from "@/mobx/filterStore"

const CategoryList: FC<CategoriesProps> = observer(
  ({ categories, setChosenCategory, chosenCategory, setCategories }) => {
    return (
      <div className="w-full">
        <ul className="w-full flex justify-center items-center gap-5 ">
          <FaChevronLeft />
          {categories
            .filter((c) =>
              c.name
                .toLocaleLowerCase()
                .includes(filterStore.search.toLocaleLowerCase())
            )
            .map((category, key) => (
              <CategoryItem
                key={key}
                category={category}
                setChosenCategory={setChosenCategory}
                chosenCategory={chosenCategory}
                setCategories={setCategories}
              />
            ))}
          <FaChevronRight />
        </ul>
      </div>
    )
  }
)

export default CategoryList

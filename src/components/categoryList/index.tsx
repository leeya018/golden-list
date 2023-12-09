import { observer } from "mobx-react-lite"
import { FC, useRef, useEffect, useState } from "react"

import { FaChevronLeft } from "react-icons/fa6"
import { FaChevronRight } from "react-icons/fa6"

import useCategories from "./hooks/useCategories"
import CategoryItem from "../categoryItem"
import filterStore from "@/mobx/filterStore"
import appStore from "@/mobx/appStore"

const CategoryList: FC = observer(({}) => {
  const { isLoading, setIsLoading, user } = useCategories()

  const elRef = useRef()

  // const handleScroll = (event) => {
  //   event.current.scrollLeft - 40
  // }
  const scrollLeft = () => {
    elRef.current.scrollTo({
      left: elRef.current.scrollLeft - 40,
      behavior: "smooth",
    })
  }
  const scrollRight = () => {
    elRef.current.scrollTo({
      left: elRef.current.scrollLeft + 40,
      behavior: "smooth",
    })
  }
  return (
    <div className="w-full flex justify-center items-center">
      <FaChevronLeft className="cursor-pointer" onClick={scrollLeft} />
      <ul
        // onScroll={handleScroll}
        ref={elRef}
        className="w-[50%] flex justify-center items-center 
      gap-5   overflow-x-hidden mx-10"
      >
        {appStore.categories
          .filter((c) =>
            c.name
              .toLocaleLowerCase()
              .includes(filterStore.search.toLocaleLowerCase())
          )
          .map((category, key) => (
            <CategoryItem key={key} category={category} />
          ))}
      </ul>
      <FaChevronRight className="cursor-pointer" onClick={scrollRight} />
    </div>
  )
})

export default CategoryList

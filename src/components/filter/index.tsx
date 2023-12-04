import React, { FC, use } from "react"
import { FaMagnifyingGlass } from "react-icons/fa6"
import filterStore from "@/mobx/filterStore"
import { observer } from "mobx-react-lite"
import useFilter from "./hooks/useFilter"

const Filter: FC = observer(() => {
  const { isFocused, setIsFocused } = useFilter()
  return (
    <div
      className={`w-full flex items-center border-b-2  border-color-text-gray  
    px-4 ${isFocused ? "ring-2 ring-color-blue" : ""}`}
    >
      <FaMagnifyingGlass size={25} className="text-color-text-gray" />
      <input
        type="text"
        className="pl-5 w-full py-6  outline-none  border-color-text-gray
         placeholder:text-color-text-gray placeholder:pl-10 "
        placeholder="Search"
        onChange={(e) => filterStore.setFilter(e.target.value)}
        value={filterStore.search}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  )
})
export default Filter

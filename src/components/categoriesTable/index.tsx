"user client"
import React, { FC, useEffect, useState } from "react"
import { FaPlusSquare } from "react-icons/fa"
import { Timestamp } from "firebase/firestore"
import { db } from "@/firebase"
import moment, { Moment } from "moment"
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md"
import { useRouter } from "next/navigation"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import { observer } from "mobx-react-lite"
import filterStore from "@/mobx/filterStore"
import { ModalStore } from "@/mobx/modalStore"
import {
  NavNames,
  modals,
  sortCategoriesByDate,
  sortCategoriesByName,
} from "@/util"
import * as API from "@/api/categories"
import { BiEditAlt } from "react-icons/bi"
import AddModal from "@/ui/modal/category/add"
import EditModal from "@/ui/modal/category/edit"
import { Category } from "@/api/categories/interfaces"
import useCategoriesTable from "./hooks/useCategoriesTable"
import { Order } from "./hooks/interfaces"
import ConfirmDeleteModal from "@/ui/modal/category/confirmDelete"
import appStore from "@/mobx/appStore"

const CategoriesTable: FC = observer(() => {
  const { router, user, sortingObj, setSortingObj, setIsLoading, isLoading } =
    useCategoriesTable()

  const getAbbreviations = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0]?.toUpperCase())
      .join(" ")
  }

  return (
    <div className="h-full px-5">
      {ModalStore.modalName === modals.confirmDeleteCategory && (
        <ConfirmDeleteModal
          onCancel={ModalStore.closeModal}
          onClick={(id: string) => appStore.removeCategory(user, id)}
          title={"Remove Category"}
          chosenCategory={appStore.chosenCategory}
        />
      )}
      {ModalStore.modalName === modals.addCategory && (
        <AddModal
          onCancel={() => {
            ModalStore.closeModal()
          }}
          onClick={(name, chosenColor) =>
            appStore.addCategory(user, name, chosenColor)
          }
          title={"Add Category"}
        />
      )}
      {ModalStore.modalName === modals.editCategory && (
        <EditModal
          onCancel={() => {
            ModalStore.closeModal()
          }}
          onEdit={(id: string, name: string, chosenColor: string) => {
            console.log(id, name, chosenColor)
            appStore.editCategory(user, id, name, chosenColor)
          }}
          onRemove={() => ModalStore.openModal(modals.confirmDeleteCategory)}
          chosenCategory={appStore.chosenCategory}
          title={"Edit Category"}
        />
      )}
      <div className="flex items-center gap-2 ml-2 mb-5">
        <h1 className="font-bold   text-2xl  flex items-center">Categories </h1>
        <FaPlusSquare
          size={25}
          onClick={() => ModalStore.openModal(modals.addCategory)}
          className="cursor-pointer text-color-blue"
        />
      </div>

      <table className="relative table-auto w-full font-medium m-7 ">
        {isLoading && (
          <Box
            sx={{ display: "flex" }}
            className="absolute top-1/2 left-1/2 -translate-y-20"
          >
            <CircularProgress />
          </Box>
        )}
        <thead className="border-b-2 border-color-text-gray ">
          <tr className="">
            <th
              className="capitalize  text-left py-4 flex items-center cursor-pointer"
              onClick={() => {
                const newStoring =
                  sortingObj["name"] === Order.asc ? Order.desc : Order.asc
                setSortingObj({ ...sortingObj, name: newStoring })
                const sortedCategories = sortCategoriesByName(
                  appStore.categories,
                  newStoring
                )
                appStore.setCategories(sortedCategories)
              }}
            >
              <div>name</div>
              {sortingObj.name === Order.asc && <MdOutlineArrowDropDown />}
              {sortingObj.name === Order.desc && <MdOutlineArrowDropUp />}
            </th>
            <th
              className="capitalize  text-left py-4 flex items-center "
              onClick={() => {
                const newStoring =
                  sortingObj["date"] === Order.asc ? Order.desc : Order.asc
                setSortingObj({ ...sortingObj, date: newStoring })
                const sortedCategories = sortCategoriesByDate(
                  appStore.categories,
                  newStoring
                )
                appStore.setCategories(sortedCategories)
              }}
            >
              <div>date</div>

              {sortingObj.date === Order.asc && <MdOutlineArrowDropDown />}
              {sortingObj.date === Order.desc && <MdOutlineArrowDropUp />}
            </th>
          </tr>
        </thead>
        <tbody className="w-full">
          {appStore.categories
            .filter((category) => category.name.includes(filterStore.search))
            .map((category) => {
              return (
                <tr
                  className="py-4  border-b-2 border-color-text-gray cursor-pointer hover:bg-opacity-90
                   hover:bg-color-hover-gray hover:ease-in-out duration-200"
                  key={category.id}
                  onClick={() => {
                    setIsLoading(true)
                    router.push(`/${NavNames.settings}/${category.id}/words`)
                  }}
                >
                  <td className="pl-5 py-4 flex items-center gap-3 ">
                    <div
                      className={`h-16 w-16 rounded-full border-2 border-color-icon-white
                     ${category.bgColor} flex  justify-center items-center`}
                    >
                      {getAbbreviations(category.name)}
                    </div>
                    <div>{category.name}</div>
                  </td>
                  <td className="py-4">
                    {moment(category.date.toDate()).format("DD-MM-YYYY")}
                  </td>
                  {/* edit section */}
                  <td>
                    <BiEditAlt
                      onClick={(e: Event) => {
                        e.stopPropagation()
                        appStore.setChosenCategory(category)
                        ModalStore.openModal(modals.editCategory)
                      }}
                      className="mr-2 p-2 cursor-pointer hover:scale-150 ease-in-out duration-200"
                      size={40}
                    />
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
})

export default CategoriesTable

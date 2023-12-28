"use client"
import React, { FC, useEffect, useState } from "react"

import moment, { Moment } from "moment"
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md"
import CircularProgress from "@mui/material/CircularProgress"
import { observer } from "mobx-react-lite"
import Box from "@mui/material/Box"
import { BiEditAlt } from "react-icons/bi"
import { FaPlusSquare } from "react-icons/fa"
import filterStore from "@/mobx/filterStore"
import { ModalStore } from "@/mobx/modalStore"
import { getFullDate, modals, sortWordsByDate, sortWordsByName } from "@/util"
import AddModal from "@/ui/modal/word/add"
import EditModal from "@/ui/modal/word/edit"
import ViewModal from "@/ui/modal/word/view"
import { Order, StickTableProps } from "./hooks/interfaces"
import useWordTable from "./hooks/useWordTable"
import * as API from "@/api/words"
import { Word } from "@/api/words/interfaces"
import { Timestamp } from "firebase/firestore"
import appStore from "@/mobx/appStore"
import ConfirmDeleteModal from "@/ui/modal/word/confirmDelete"

const WordsTable: FC<StickTableProps> = observer(({ categoryId }) => {
  const { user, router, sortingObj, setSortingObj } = useWordTable(categoryId)

  const getAbbreviations = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0]?.toUpperCase())
      .slice(0, 2)
      .join(" ")
  }

  return (
    <div className=" h-full ">
      {ModalStore.modalName === modals.confirmDeleteWord && (
        <ConfirmDeleteModal
          onCancel={() => {
            ModalStore.closeModal()
          }}
          onClick={(wordId: string) =>
            appStore.removeWord(user, categoryId, wordId)
          }
          title="Remove Word"
          chosenWord={appStore.chosenWord}
        />
      )}
      {ModalStore.modalName === modals.addWord && (
        <AddModal
          onCancel={() => {
            ModalStore.closeModal()
          }}
          onClick={(word: Word) => appStore.addWord(user, categoryId, word)}
          title={"Add Word"}
        />
      )}
      {ModalStore.modalName === modals.editWord && (
        <EditModal
          onCancel={() => {
            ModalStore.closeModal()
          }}
          onEdit={(word: Word) => appStore.editWord(user, categoryId, word)}
          onRemove={() => ModalStore.openModal(modals.confirmDeleteWord)}
          chosenWord={appStore?.chosenWord}
          title={"Edit Word"}
        />
      )}
      {ModalStore.modalName === modals.viewWord && (
        <ViewModal
          onCancel={() => {
            ModalStore.closeModal()
          }}
          chosenWord={appStore.chosenWord}
          title={"View Word"}
        />
      )}

      <div className="flex items-center justify-between gap-2 mx-2 mb-5 flex-1">
        <div className="flex items-center gap-2 ">
          <h1 className="font-bold   text-2xl  flex items-center">Words </h1>
          <FaPlusSquare
            size={25}
            onClick={() => ModalStore.openModal(modals.addWord)}
            className="cursor-pointer text-color-blue"
          />
        </div>
      </div>
      <table
        className="flex-1 max-h-full table-auto 
       w-full font-medium m-7"
      >
        {appStore.isLoading && (
          <Box
            sx={{ display: "flex" }}
            className="absolute top-1/2 left-1/2 -translate-y-20"
          >
            <CircularProgress />
          </Box>
        )}

        <thead className="sticky top-0 border-b-2 border-color-text-gray  ">
          <tr className="">
            <th
              className="capitalize  text-left py-4 flex items-center "
              onClick={() => {
                const newStoring =
                  sortingObj["name"] === Order.asc ? Order.desc : Order.asc
                setSortingObj({ ...sortingObj, name: newStoring })
                const sortedWords = sortWordsByName(appStore.words, newStoring)
                appStore.setWords(sortedWords)
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
                const sortedWords = sortWordsByDate(appStore.words, newStoring)
                appStore.setWords(sortedWords)
              }}
            >
              <div>date</div>

              {sortingObj.date === Order.asc && <MdOutlineArrowDropDown />}
              {sortingObj.date === Order.desc && <MdOutlineArrowDropUp />}
            </th>
          </tr>
        </thead>
        <tbody className="w-full flex-1 overflow-y-scroll ">
          {appStore.words &&
            appStore.words
              .filter((word) => word.name.includes(filterStore.search))
              .map((word) => {
                return (
                  <tr
                    className="py-4  border-b-2 border-color-text-gray cursor-pointer hover:bg-opacity-90 hover:bg-color-hover-gray hover:ease-in-out duration-200"
                    key={word.id}
                    onClick={() => {
                      appStore.setChosenWord(word)
                      ModalStore.openModal(modals.viewWord)
                    }}
                  >
                    <td className="pl-5 py-4 flex items-center gap-3 ">
                      <div
                        className=" h-16 w-16 rounded-full border-2
                       border-color-icon-white bg-color-icon-green flex
                         justify-center items-center "
                      >
                        {getAbbreviations(word?.name)}
                      </div>
                      <div>
                        {word.name.length < 30
                          ? word.name
                          : word.name.slice(0, 30) + "..."}
                      </div>
                    </td>
                    <td className="py-4">{getFullDate(word.date)}</td>
                    {/* edit section */}
                    <td>
                      <BiEditAlt
                        onClick={(e: Event) => {
                          e.stopPropagation()
                          appStore.setChosenWord(word)
                          ModalStore.openModal(modals.editWord)
                        }}
                        className=" cursor-pointer 
                        hover:scale-150 ease-in-out duration-200"
                        size={20}
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
export default WordsTable

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
import { modals, sortSticksByDate, sortSticksByName } from "@/util"
import AddModal from "@/ui/modal/stick/add"
import EditModal from "@/ui/modal/stick/edit"
import ViewModal from "@/ui/modal/stick/view"
import { Order, StickTableProps } from "./hooks/interfaces"
import useStickTable from "./hooks/useStickTable"
import * as API from "@/api/sticks"
import { Stick } from "@/api/sticks/interfaces"
import { Timestamp } from "firebase/firestore"

const SticksTable: FC<StickTableProps> = observer(({ categoryId }) => {
  const {
    user,
    setSticks,
    sticks,
    chosenStick,
    setIsLoading,
    router,
    sortingObj,
    isLoading,
    setChosenStick,
    setSortingObj,
  } = useStickTable(categoryId)

  const getAbbreviations = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0]?.toUpperCase())
      .slice(0, 2)
      .join(" ")
  }

  const addStick = async (categoryId: string, name: string) => {
    const docId: string | undefined = await API.addStick(user, categoryId, name)
    if (!docId) {
      throw new Error("could not find the docId")
    }
    const newStick: Stick = {
      id: docId,
      name,
      answers: [],
      date: Timestamp.now(),
    }
    const allSticks: Stick[] = [newStick, ...sticks]
    setSticks(allSticks)
  }

  const removeStick = async (stickId: string) => {
    await API.removeStick(user, categoryId, stickId)
    const updatedSticks = sticks.filter((stick) => {
      if (stick.id !== stickId) {
        return stick
      }
    })
    setSticks(updatedSticks)
  }

  const editStick = async (stickId: string, name: string) => {
    await API.editStick(user, categoryId, stickId, name)
    const updatedSticks = sticks.map((stick) => {
      if (stick.id === stickId) {
        return { ...stick, name }
      }
      return stick
    })
    setSticks(updatedSticks)
  }

  return (
    <div className=" h-full ">
      {ModalStore.modalName === modals.addStick && (
        <AddModal
          onCancel={() => {
            ModalStore.closeModal()
          }}
          onClick={(stickName: string) => addStick(categoryId, stickName)}
          title={"Add Stick"}
        />
      )}
      {ModalStore.modalName === modals.editStick && (
        <EditModal
          onCancel={() => {
            ModalStore.closeModal()
          }}
          onEdit={(stickId: string, stickName: string) =>
            editStick(stickId, stickName)
          }
          onRemove={(stickId: string) => removeStick(stickId)}
          chosenStick={chosenStick}
          title={"Edit Stick"}
        />
      )}
      {ModalStore.modalName === modals.viewStick && (
        <ViewModal
          onCancel={() => {
            ModalStore.closeModal()
          }}
          chosenStick={chosenStick}
          title={"View Stick"}
        />
      )}

      <div className="flex items-center justify-between gap-2 mx-2 mb-5 flex-1">
        <div className="flex items-center gap-2 ">
          <h1 className="font-bold   text-2xl  flex items-center">Sticks </h1>
          <FaPlusSquare
            size={25}
            onClick={() => ModalStore.openModal(modals.addStick)}
            className="cursor-pointer text-color-blue"
          />
        </div>
        <button
          onClick={() => {
            setIsLoading(true)
            router.push(`/categories/${categoryId}/practice`)
          }}
          className="border-color-blue border-2 bg-color-blue text-color-white rounded-md py-2 px-4 cursor-pointer"
        >
          PRACTICE
        </button>
      </div>
      <table
        className="flex-1 max-h-full table-auto 
       w-full font-medium m-7"
      >
        {isLoading && (
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
                const sortedSticks = sortSticksByName(sticks, newStoring)
                setSticks(sortedSticks)
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
                const sortedSticks = sortSticksByDate(sticks, newStoring)
                setSticks(sortedSticks)
              }}
            >
              <div>date</div>

              {sortingObj.date === Order.asc && <MdOutlineArrowDropDown />}
              {sortingObj.date === Order.desc && <MdOutlineArrowDropUp />}
            </th>
          </tr>
        </thead>
        <tbody className="w-full flex-1 overflow-y-scroll ">
          {sticks &&
            sticks
              .filter((stick) => stick.name.includes(filterStore.search))
              .map((stick) => {
                return (
                  <tr
                    className="py-4  border-b-2 border-color-text-gray cursor-pointer hover:bg-opacity-90 hover:bg-color-hover-gray hover:ease-in-out duration-200"
                    key={stick.id}
                    onClick={() => {
                      setChosenStick(stick)
                      ModalStore.openModal(modals.viewStick)
                    }}
                  >
                    <td className="pl-5 py-4 flex items-center gap-3 ">
                      <div
                        className=" h-16 w-16 rounded-full border-2
                       border-color-icon-white bg-color-icon-green flex
                         justify-center items-center "
                      >
                        {getAbbreviations(stick?.name)}
                      </div>
                      <div>
                        {stick.name.length < 30
                          ? stick.name
                          : stick.name.slice(0, 30) + "..."}
                      </div>
                    </td>
                    <td className="py-4">
                      {moment(stick.date.toDate()).format("DD-MM-YYYY")}
                    </td>
                    {/* edit section */}
                    <td>
                      <BiEditAlt
                        onClick={(e: Event) => {
                          e.stopPropagation()
                          setChosenStick(stick)
                          ModalStore.openModal(modals.editStick)
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
export default SticksTable

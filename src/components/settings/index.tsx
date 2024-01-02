"use client"
import React, { FC, useEffect, useState } from "react"

import { SettingsProps, TitleProps } from "./hooks/interfaces"

import { observer } from "mobx-react-lite"
import { SettingsStore } from "@/mobx/settingsStore"

const Settings: FC<SettingsProps> = observer(() => {
  return (
    <div className="relative h-full p-2 ">
      <div className="flex items-center gap-2 flex-col">
        <Title>Choose your preferred settings:</Title>
        <div className="w-full p-5 flex items-center gap-2">
          <label className="font-semibold text-color-text-gray" htmlFor="">
            Repetition practice amount:
          </label>
          <input
            onChange={(e: any) =>
              SettingsStore.setPracticeRepetition(e.target.value)
            }
            value={SettingsStore.practiceRepetition}
            type="number"
            min="3"
            max="10"
            className="rounded-md w-20 p-2 border-2 border-color-text-gray pl-2 placeholder:text-color-hover-gray font-semibold placeholder:pl-2"
            placeholder="Add Practice Repetition"
          />
        </div>
      </div>
    </div>
  )
})
export default Settings

const Title: FC<TitleProps> = ({ children }) => {
  return (
    <h1 className="flex items-center justify-center font-semibold text-xl underline mb-4 mt-2 ">
      {children}
    </h1>
  )
}

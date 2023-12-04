"use client"

import NavLeft from "@/components/navLeft"
import Settings from "@/components/settings"
import { useParams } from "next/navigation"

export default function SettingsPage() {
  const params = useParams()
  // useLoginCheck()
  return (
    <div className="flex min-h-screen  bg-white ">
      <NavLeft />
      <div className="basis-5/6  flex flex-col gap-2">
        <Settings />
      </div>
    </div>
  )
}

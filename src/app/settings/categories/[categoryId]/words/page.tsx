"use client"
import WordsTable from "@/components/wordsTable"
import Filter from "@/components/filter"

import { useParams } from "next/navigation"
import Nav from "@/components/nav"
import Alerts from "@/ui/Alerts"

export default function SticksPage() {
  const params = useParams()
  // useLoginCheck()

  return (
    <div className="flex flex-col min-h-screen  bg-white ">
      <Alerts />

      <Nav />
      <div className="  flex flex-col gap-2">
        <Filter />
        <WordsTable categoryId={params.categoryId as string} />
      </div>
    </div>
  )
}

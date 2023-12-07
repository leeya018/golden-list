"use client"
import SticksTable from "@/components/sticksTable"
import Filter from "@/components/filter"

import { useParams } from "next/navigation"
import Nav from "@/components/nav"

export default function SticksPage() {
  const params = useParams()
  // useLoginCheck()

  return (
    <div className="flex min-h-screen  bg-white ">
      <Nav />
      <div className="basis-5/6  flex flex-col gap-2">
        <Filter />
        <SticksTable categoryId={params.categoryId as string} />
      </div>
    </div>
  )
}

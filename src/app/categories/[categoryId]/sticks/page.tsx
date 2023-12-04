"use client"
import SticksTable from "@/components/sticksTable"
import Filter from "@/components/filter"
import NavLeft from "@/components/navLeft"
import { useParams } from "next/navigation"

export default function SticksPage() {
  const params = useParams()
  // useLoginCheck()

  return (
    <div className="flex min-h-screen  bg-white ">
      <NavLeft />
      <div className="basis-5/6  flex flex-col gap-2">
        <Filter />
        <SticksTable categoryId={params.categoryId as string} />
      </div>
    </div>
  )
}

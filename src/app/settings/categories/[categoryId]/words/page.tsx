"use client"
import WordsTable from "@/components/wordsTable"
import Filter from "@/components/filter"

import { useParams, useRouter } from "next/navigation"
import Nav from "@/components/nav"
import Alerts from "@/ui/Alerts"
import { IoMdArrowRoundBack } from "react-icons/io"
import { useState } from "react"

export default function WordsPage() {
  const params = useParams()
  const router = useRouter()
  const [iIsLoading, setIsLoading] = useState(false)
  // useLoginCheck()

  return (
    <div className="flex flex-col min-h-screen  bg-white ">
      <Alerts />
      <Nav />
      <div className="  flex flex-col gap-2">
        <IoMdArrowRoundBack
          className="cursor-pointer"
          size={25}
          onClick={() => {
            setIsLoading(true)
            router.back()
          }}
        />
        <Filter />
        {params?.categoryId && (
          <WordsTable categoryId={params.categoryId as string} />
        )}
      </div>
    </div>
  )
}

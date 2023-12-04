"use client"

import NavLeft from "@/components/navLeft"
import { useParams, useRouter } from "next/navigation"
import Practice from "@/components/practice"

export default function PracticePage() {
  const params = useParams()
  // useLoginCheck()
  return (
    <div className="flex min-h-screen  bg-white overflow-y-hidden">
      <NavLeft />
      <div className="basis-5/6  flex flex-col gap-2 overflow-y-hidden">
        <Practice categoryId={params.categoryId as string} />
      </div>
    </div>
  )
}

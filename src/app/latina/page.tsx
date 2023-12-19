"use client"
import React from "react"

export default function latinaPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="bg-color-red">latinaPage 11112</div>
      <div className="bg-color-green font-bold text-4xl h-24 border-2 flex items-center">
        lee
      </div>
      <div
        onClick={() => alert("latina where are you ? ")}
        className="bg-color-blue cursor-pointer hover:translate-x-10 hover:translate-y-10
        "
      >
        lee2
      </div>
    </div>
  )
}

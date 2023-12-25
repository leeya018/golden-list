import React, { useState, useEffect } from "react"

export const Modes: any = {
  all: "all",
  byOne: "byOne",
}

const useGpt = () => {
  const [mode, setMode] = useState(Modes.byOne)

  useEffect(() => {
    console.log({ mode })
  }, [])

  return { mode, setMode }
}

export default useGpt

import React, { useState } from "react"

const useFilter = () => {
  const [isFocused, setIsFocused] = useState(false)

  return { isFocused, setIsFocused }
}

export default useFilter

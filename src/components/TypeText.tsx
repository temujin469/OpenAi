import React, { useEffect, useState } from 'react'
type Props = {
  text: string
  isAi: boolean
  error?: boolean
}
function TypeText({ text, isAi, error }: Props) {
  const [index, setIndex] = useState<number>(0);
  const [typedText, setTypedText] = useState('')


  useEffect(() => {
    const interval = setInterval(() => {
      if (index < text.length) {
        setTypedText(prev => prev + text.charAt(index))
        setIndex(prev => prev + 1)
        console.log(index)
      }
    }, 20)
    return index === text.length || !isAi ? clearInterval(interval) : () => clearInterval(interval)
  }, [index])


  return (
    <p className={`selection:text-white break-words selection:bg-primary ${error ? 'text-red-400' : "dark:text-primary text-mainText"}`}>{isAi ? `${typedText}` : text}</p>
  )
}

export default TypeText
import React, { useEffect, useState } from 'react'

type Props = {
  loading: boolean
}

function Loader({ loading }: Props) {
  const [dots, setDots] = useState<string>("")
  useEffect(() => {

    const interval = setInterval(() => {
      setDots(prev => prev + ".")
      if (dots.length >= 4) {
        setDots("")
      }
    }, 300)
    return !loading ? clearInterval(interval) : () => clearInterval(interval)

  }, [dots])



  return (
    <p className='text-mainText dark:text-primary'>{dots}</p>
  )
}

export default Loader;
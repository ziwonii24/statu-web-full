import React, { useState, useEffect } from 'react'

export default function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      // width: isClient ? window.innerWidth : undefined,
      // height: isClient ? window.innerHeight : undefined
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  const [windowSize, setWindowSize] = useState(getSize);
 
  useEffect(() => {
    if (!isClient) {
      return
    }
    
    function handleResize() {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
  // if (!windowSize.width) return
  // if (windowSize.width > 1200) {
  //   return 'XL'
  // } else if (windowSize.width > 992) {
  //   return 'LG'
  // } else if (windowSize.width > 768) {
  //   return 'MD'
  // } else if (windowSize.width > 576) {
  //   return 'SM'
  // } else {
  //   return 'XS'
  // }
}
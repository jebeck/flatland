import React from 'react'
import Lottie from 'react-lottie'

import data from '../lottie/edwin-abbott-abbott.json'

export default function EdwinAbbottAbbott() {
  return (
    <Lottie options={{animationData: data, autoplay: true, height: 1080, loop: false, width: 1920 }}/>
  )
}
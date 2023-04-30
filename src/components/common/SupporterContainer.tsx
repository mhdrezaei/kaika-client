import React from 'react'

const SupporterContainer = ({children , setStyle}) => {
  return (
    <div className={`${setStyle}`} >{children}</div>
  )
}

export default SupporterContainer
import React, { FC } from 'react'
interface IsupportList {
    title : string;
    url : string
}
const SupporterList : FC<IsupportList> = ({title , url}) => {
  return (
    <span className=' inline-block bg-gray-900 p-6 mx-3 rounded-tr-lg rounded-bl-lg shadow-sm hover:shadow-md shadow-kaika-yellow hover:shadow-kaika-yellow hover:bg-blue-gray-300'>
        <img src={url} alt={title} className='w-20 h-20' />
    </span>
  )
}

export default SupporterList
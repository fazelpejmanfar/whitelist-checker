import React from 'react'
import Image from 'next/image'

function Header() {
  return (
    <div className='w-full h-20 flex justify-between items-center p-5 absolute top-0'>
    <div>
    <h1 className='text-2xl font-bold font-mono'>
        Whitelist Checker
    </h1>
    </div>

    </div>
  )
}

export default Header
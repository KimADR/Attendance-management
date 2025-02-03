import React from 'react'
import SideNav from './_components/SideNav'
import Header from './_components/Header'

function layout({children}) {
  return (
    <div>
      <div className='md:w-80 fixed hidden md:block'>
        <SideNav/>
      </div>
      <div className='md:ml-80'>
        <Header/>
      {children}
      </div>
    </div>
  )
}

export default layout

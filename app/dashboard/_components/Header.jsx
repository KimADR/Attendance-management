"use client"

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image';
import React from 'react'

function Header() {
  const {user}= useKindeBrowserClient();
  return (
    <div className='p-4 shadow-sm border flex justify-between'>
      <div>

      </div>
      <div>
          {user?.picture && (
            <Image
              src={user.picture}
              width={35}
              height={35}
              alt="User"
              className="rounded-full cursor-pointer"
            />
         )}
      </div>
    </div>
  )
}

export default Header

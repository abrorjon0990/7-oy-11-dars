import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='bg-[#14161a] max-w-[1920px] mx-auto py-8 rounded'>
        <div className="container   mx-auto flex items-center justify-between text-white">
      <Link className='text-[#87CEEB] text-2xl' to="/">CRYPTOFOLIO</Link>
          <div>
            <select className='bg-[#14161a] mr-6'>
                <option>USD</option>
                <option>EUR</option>
                <option>RUB</option>
            </select>
            <button className='bg-[#87CEEB] py-2 px-3 rounded text-black'>WATCH LIST</button>
          </div>
          </div>
    </header>
  )
}

export default Header

import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-gray-800 text-white'>
       
       <div className="mycontainer flex items-center justify-between px-4 h-14 py-5">
        <div className="logo font-bold text-white text-2xl">
            <span className='text-green-500'>&lt;</span>
         <span>Pass</span>
            <span className='text-green-500'>OP/&gt;</span>
            </div>
      {/* <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold'  href="/">Home</a>
            <a className='hover:font-bold'  href="/">About</a>
            <a  className='hover:font-bold' href="/">Contect</a>
            
        </li>
      </ul> */}
      <button className='bg-green-800 text-white my-5 rounded-full flex  justify-between items-center ring-1 ring-white'>
        <img className='invert p-1 w-10' src="icons/github.svg" alt="Github logo" />
         <span className='font-bold px-2'>GitHub</span>
      </button>
        </div> 
    </nav>
  )
}

export default Navbar

import React, { useContext, useState } from 'react'
import {  NavLink, Outlet } from 'react-router-dom'
import { MdMenu } from "react-icons/md";
import MobileNav from './MobileNav';
import { FaOpencart } from "react-icons/fa";
import { context_page } from '../context/ContextProduct';
import { input } from 'framer-motion/client';


const Navbar = () => {

    const [mobView, setMobView] = useState(false)
    const { users } = useContext(context_page);

    



    const id = localStorage.getItem('id')
    if (!id) {
        console.log("No ID found in localStorage.");
      }

    const currentUser = users.find((item)=> (item.id) === (id))

    const Links = [
        { name: 'Home', link: '/' },
        { name: 'Profile', link: '/profile' },
        // { name: input>, link: '/search' },
        { name: <div className='flex '>Cart <FaOpencart size={26}/></div>, link: '/cart' },
    ]

// ======================== sign out function ===================================
    const handleSignOut = () => {
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
    }

    // =============================  ==============================

    







    return (
        <>

            <nav className='w-screen h-20  flex flex-wrap  fixed top-0'>
                <div className='md:flex-1  flex items-center w-full  justify-between'>
                    <span className='md:ml-16 ml-8 md:text-4xl text-2xl'>Urban Oak</span>
                    <div className=' md:hidden'>
                        <button className='mr-8 text-4xl' onClick={() => setMobView(!mobView)
                        }>
                            {
                                console.log(mobView)
                                
                            }
                            <MdMenu />
                        </button>
                    </div> 
                </div>
                <div className='flex-1  md:flex justify-center items-center hidden'>
                    <ul className='flex flex-wrap gap-4 text-lg'>
                        {
                            Links.map((x, i) => (
                                <NavLink key={i} to={x.link}>
                                    {x.name}
                                </NavLink>
                            ))
                        }
                    </ul>
                </div>
                {
                    currentUser ? ( <div className='flex-1 md:flex justify-end items-center hidden'>
                    <span className='mr-16 '>
                        <NavLink to='/signin'>
                            <button className='bg-slate-300 py-2 px-4 rounded-lg  hover:bg-slate-500 hover:text-white'
                            onClick={handleSignOut}>
                                Sign Out
                            </button>
                        </NavLink>
                    </span>
                </div> ) : (
                <div className='flex-1 md:flex justify-end items-center hidden'>
                <span className='mr-16 '>
                    <NavLink to='/signin'>
                        <button className='bg-slate-300 py-2 px-4 rounded-lg rounded-tr-none rounded-br-none hover:bg-slate-500 hover:text-white'>
                            Sign In
                        </button>
                    </NavLink>
                    <NavLink to='/signup'>
                        <button className='bg-slate-300 py-2 px-4 rounded-lg rounded-tl-none rounded-bl-none hover:bg-slate-500 hover:text-white'>
                            Sign Up
                        </button>
                    </NavLink>
                </span>
            </div>)
                }
            </nav>
            <MobileNav mobView={mobView} setMobView={setMobView}/>
            <Outlet />
        </>
    )
}

export default Navbar

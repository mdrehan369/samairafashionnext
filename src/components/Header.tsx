"use client"

import React, { useEffect, useState } from 'react'
import Button from './Button';
import { toggleTheme as toggleReduxTheme } from '@/lib/features/themeSlice';
import { logout } from "@/lib/features/authSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { BsTruck } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";
import { PiMoon } from "react-icons/pi";
import { LuSun } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import LightSpinner from './LightSpinner';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Header() {

    const status = useAppSelector(state => state.auth.status);
    const [dropdown, setDropdown] = useState(false);
    const theme = useAppSelector(state => state.theme.theme);
    const dispatch = useAppDispatch();
    const [sidebar, setSidebar] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [loader, setLoader] = useState(false);
   
    const toggleTheme = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const swich = document.getElementById('switch')
        if (!localStorage.getItem("theme") || localStorage.getItem("theme") === 'dark') {
            localStorage.setItem("theme", "light");
            document.documentElement.classList.remove('dark')
            if(swich) swich.style.transform = 'rotate(360deg)'
        } else {
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.add('dark');
            if(swich) swich.style.transform = 'rotate(0deg)'
        }
        dispatch(toggleReduxTheme());
    }

    const handleLogout = async () => {
        try {
            setLoader(true);
            await axios.get('/api/v1/users/logout', {
                baseURL: process.env.VITE_BACKEND_URL,
                withCredentials: true
            });
            dispatch(logout());
            window.location.href = '/';
        } catch (err) {
            console.log(err);
        } finally {
            setLoader(false);
        }
    }

    const pathname = usePathname()

    const activeClasses = (isActive: string) =>  `py-1 text-[14px] dark:text-white after:dark:bg-white font-light text-gray-800 relative transition after:h-[3px] after:bg-stone-700 after:rounded-full after:w-0 after:absolute after:content-[''] after:bottom-0 after:transition-all after:left-0 hover:after:w-[100%] ${isActive === pathname ? 'after:w-[100%]' : ''}`

    return (
        !(pathname === '/signin') &&
        <>
            {
                <div className={`fixed w-[100vw] h-[100vh] text-black ${!openModal ? 'bg-opacity-0 backdrop-blur-0 -z-30' : 'bg-opacity-50 backdrop-blur-md z-40'} flex items-center justify-center transition-all bg-black duration-900`}>
                    <div className={`${openModal ? 'md:w-[30%] w-[90%] h-[30%]' : 'w-0 h-0'} overflow-hidden bg-[#f1f1f1] rounded-lg shadow-md transition-all dark:bg-secondary-color duration-300 flex flex-col items-center justify-center gap-6 z-30`}>
                        {
                            openModal &&
                            <>
                                <div className='uppercase text-sm font-bold text-center dark:text-white'>Are You Sure You Want To Logout ?</div>
                                <div className='flex items-center justify-center gap-6 w-full'>
                                    <button className='w-24 h-10 bg-red-400 rounded-md hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-600 text-sm font-bold' onClick={() => handleLogout()} disabled={loader}>{
                                        loader ?
                                            <LightSpinner color={""} />
                                            : 'Yes'
                                    }</button>
                                    <button className='w-24 h-10 bg-green-400 rounded-md hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-600 text-sm font-bold' onClick={() => setOpenModal(false)} disabled={loader}>No</button>
                                </div>
                            </>
                        }
                    </div>
                </div>
            }
            <nav className={`w-full dark:border-0 md:h-[10vh] h-[8vh] animate-animate-appear sticky border-b-[1px] top-0 left-0 z-50 flex items-center md:justify-between justify-center md:gap-0 gap-4 shadow-sm bg-white dark:bg-primary-color dark:text-white`}>
                <div className='md:hidden cursor-pointer' onClick={() => setSidebar((prev) => !prev)}><FontAwesomeIcon icon={faBars} className='size-6 absolute top-6 left-4' /></div>


                <div className='w-[30%] h-full hidden md:block'>
                    <ul className='w-full h-full flex items-center justify-center gap-10 font-semibold text-md'>
                        <Link href='/' className={activeClasses("/")}>Home</Link>
                        <Link href='/shop' className={activeClasses("/shop")}
                            onMouseEnter={() => setDropdown(true)}
                            onMouseLeave={() => setDropdown(false)}
                            onClick={(e) => e.preventDefault()}

                        >Shop
                            {
                                dropdown &&
                                <div className={`absolute top-7 font-lato divide-y-2 transition-all overflow-hidden flex flex-col items-center justify-start left-[-4vw] shadow-lg bg-white dark:bg-secondary-color dark:text-white text-black dark:divide-slate-950`} onClick={() => setDropdown(false)}>
                                    <Link href={'/shop?category=Straight'} className='px-4 py-4 w-52 text-start hover:underline hover:bg-gray-200 dark:hover:bg-[#132d6a]  transition-colors text-sm font-medium'>Straight</Link>
                                    <Link href={'/shop?category=Umbrella'} className='px-4 py-4 w-52 text-start hover:underline hover:bg-gray-200 dark:hover:bg-[#132d6a]  transition-colors text-sm font-medium'>Umbrella</Link>
                                    <Link href={'/shop?category=Tye Dye'} className='px-4 py-4 w-52 text-start hover:underline hover:bg-gray-200 dark:hover:bg-[#132d6a]  transition-colors text-sm font-medium'>Tye Dye</Link>
                                    <Link href={'/shop?category=Farasha'} className='px-4 py-4 w-52 text-start hover:underline hover:bg-gray-200  dark:hover:bg-[#132d6a] transition-colors text-sm font-medium'>Farasha</Link>
                                </div>
                            }
                        </Link>
                        <Link href='/policies/aboutus' className={activeClasses("/policies/aboutus")}>About Us</Link>
                        <Link href='/policies/contact' className={activeClasses("/policies/contact")}>Contact Us</Link>
                    </ul>
                </div>


                <Image alt='' width={1000} height={1000} src={theme == 'dark' ? "/darkLogo.png" : "/logo.avif"} className='md:w-[20%] w-[60%] h-auto md:mx-auto' />
                <Link href={'/search'} className='md:hidden absolute top-6 right-4'><FontAwesomeIcon icon={faSearch} className='size-6 cursor-pointer' /></Link>
                <div className={`md:hidden absolute ${sidebar ? 'w-[100vw]' : 'w-0'} z-20 bg-black bg-opacity-50 overflow-hidden overscroll-x-contain h-[100vh] overscroll-contain left-0 top-[8vh]`} onClick={() => { setSidebar(false) }}>
                    <div className={`bg-gray-100 dark:bg-secondary-color divide-y-2 dark:divide-slate-800 flex flex-col items-start ${sidebar ? 'w-[80%]' : 'w-0'} ease-in-out duration-300 transition-all overflow-hidden shadow-sm h-full justify-start`}>
                        {
                            sidebar &&
                            <>
                                <Link href={'/'} className='w-full min-w-fit py-4 px-6 text-sm'>Home</Link>
                                <Link href={'/shop?category=Straight'} className='w-full py-4 px-6 min-w-fit text-sm'>Straight Abaya</Link>
                                <Link href={'/shop?category=Umbrella'} className='w-full py-4 px-6 min-w-fit text-sm'>Umbrella Abaya</Link>
                                <Link href={'/shop?category=Farasha'} className='w-full py-4 px-6 min-w-fit text-sm'>Farasha Abaya</Link>
                                <Link href={'/shop?category=Tye Dye'} className='w-full py-4 px-6 min-w-fit text-sm'>Tye Dye Abaya</Link>
                                <Link href={'/policies/contact'} className='w-full py-4 px-6 min-w-fit text-sm'>Contact Us</Link>
                                <Link href={'/policies/aboutus'} className='w-full py-4 px-6 min-w-fit text-sm'>About</Link>
                                {
                                    !status ?
                                        <>
                                            <Link href={'/signin'} className='w-full py-4 px-6 text-sm'>Sign In</Link>
                                            {/* <Link href={'/signup'} className='w-full py-4 px-6 text-sm'>Sign Up</Link> */}
                                        </>
                                        :
                                        <>
                                            <Link href='/orders' className='w-full py-4 px-6 text-sm'>My Orders</Link>
                                            <Link href='/cart' className='w-full py-4 px-6 text-sm'>My Cart</Link>
                                            <Link href='#' onClick={() => setOpenModal(true)} className='w-full py-4 px-6 text-sm'>Log Out</Link>
                                        </>
                                }
                                <Link href={'#'} onClick={toggleTheme} className='w-full py-4 px-6 min-w-fit text-sm'>Toggle Theme</Link>
                            </>
                        }
                    </div>
                </div>

                <div className='w-[30%] h-full hidden md:block'>
                    <ul className='w-full h-full flex items-center pl-16 justify-center gap-4 font-semibold text-xl'>
                        <Link href='/search' className={`hover:bg-[#e2e2e2] hover:dark:bg-blue-950 ${'/search' === pathname && 'bg-gray-300 dark:bg-blue-950'} transition px-2 py-2 rounded-full after:bg-gray-200 after:opacity-0 after:hover:opacity-100 after:transition-opacity after:w-fit after:h-fit after:content-['Search'] after:absolute after:text-xs relative after:font-normal after:bottom-[-30px] after:dark:bg-blue-950 after:rounded-sm after:px-1 after:py-0.5 text-black after:left-0`}>
                            <IoIosSearch size='22' />
                        </Link>
                        {status && <Link href='/cart' className={`hover:bg-[#e2e2e2] hover:dark:bg-blue-950 ${'/cart' === pathname && 'bg-gray-300 dark:bg-blue-950'} transition px-2 py-2 rounded-full after:bg-gray-200 after:opacity-0 after:hover:opacity-100 after:transition-opacity after:w-fit after:h-fit after:content-['Cart'] after:absolute after:text-xs relative after:font-normal after:dark:bg-blue-950 after:bottom-[-30px] after:rounded-sm after:px-1 after:py-0.5 after:left-2`}><IoCartOutline size='22' /></Link>}
                        {
                            status &&
                            <>
                                <Link href='/orders' className={`hover:bg-[#e2e2e2] hover:dark:bg-blue-950 ${'/orders' === pathname && 'bg-gray-300 dark:bg-blue-950'} transition px-2 py-2 rounded-full after:bg-gray-200 after:opacity-0 after:hover:opacity-100 after:transition-opacity after:w-fit after:h-fit after:content-['Orders'] after:dark:bg-blue-950 after:absolute after:text-xs relative after:font-normal after:bottom-[-30px] after:rounded-sm after:px-1 after:py-0.5 after:left-0`}><BsTruck size='22' /></Link>
                                <Link onClick={() => setOpenModal(true)} href='#' className={`hover:bg-[#e2e2e2] hover:dark:bg-blue-950 transition px-2 py-2 rounded-full after:bg-gray-200 after:opacity-0 after:hover:opacity-100 after:transition-opacity after:w-fit after:h-fit after:content-['Logout'] after:dark:bg-blue-950 after:absolute after:text-xs relative after:font-normal after:bottom-[-30px] after:rounded-sm after:px-1 after:py-0.5 after:left-0`}><IoExitOutline size='22' /></Link>
                            </>
                        }
                        {
                            theme === 'light' ?
                                <Link href={"#"} onClick={toggleTheme} id='switch' className={`hover:bg-[#e2e2e2] hover:dark:bg-blue-950 transition px-2 text-black py-2 rounded-full duration-300 after:bg-gray-200 after:opacity-0 after:hover:opacity-100 after:transition-opacity after:w-fit after:h-fit after:content-['Theme'] after:dark:bg-blue-950 after:absolute after:text-xs relative after:font-normal after:bottom-[-30px] after:rounded-sm after:px-1 after:py-0.5 after:left-0`} ><PiMoon size='22' /></Link>
                                :
                                <Link href={"#"} onClick={toggleTheme} id='switch' className={`hover:bg-[#e2e2e2] hover:dark:bg-blue-950 transition px-2 py-2 rounded-full duration-300 after:bg-gray-200 after:opacity-0 after:hover:opacity-100 after:dark:bg-blue-950 after:transition-opacity after:w-fit after:h-fit after:content-['Theme'] after:absolute after:text-xs relative after:font-light after:bottom-[-30px] after:rounded-sm after:px-1 after:py-0.5 after:left-0`} ><LuSun size='22' /></Link>
                        }
                        {
                            !status &&
                            <>
                                <Link href='/signin'><Button className='transition py-2 px-3 bg-white text-sm border-2 hover:text-white text-black hover:bg-black'>Sign In</Button></Link>
                            </>
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Header
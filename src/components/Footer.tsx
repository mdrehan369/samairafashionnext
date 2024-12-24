"use client"

import React, { use } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocation, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faPinterest } from "@fortawesome/free-brands-svg-icons";
import Button from './Button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {

    const pathname = usePathname();

    return (
        !( pathname === 'signin') &&
        <footer className='bg-black mt-10 text-gray-300 text-sm flex flex-col items-center justify-start divide-y-2 divide-gray-600 w-full md:h-[50vh] h-auto relative bottom-0 left-0'>
            <div className='w-full h-[90%] mt-10 flex md:flex-row flex-col items-start md:gap-0 gap-10 md:justify-between justify-normal px-4'>
                <div className='space-y-1'>
                    <Image width={100} height={100} src={"/darkLogo.png"} alt="logo" className='md:w-[80%] w-full mb-4' />
                    <p><FontAwesomeIcon icon={faLocation} className='text-white mr-2' /><span>29A/H/2 Palm Avenue,Kolkata 700019, West Bengal, India</span></p>
                    <p><FontAwesomeIcon icon={faPhone} className='text-white mr-2' /><span>+97 15216 60581</span></p>
                    <p><FontAwesomeIcon icon={faEnvelope} className='text-white mr-2' /><span>samaira.shop1@gmail.com</span></p>
                </div>
                <div className='flex flex-col items-start justify-start gap-2'>
                    <h1 className='font-bold text-lg text-white'>POLICIES</h1>
                    <Link href='/policies/shipping' className='hover:underline cursor-pointer hover:text-white'>Shipping Policy</Link>
                    <Link href='/policies/privacy' className='hover:underline cursor-pointer hover:text-white'>Privacy Policy</Link>
                    <Link href='/policies/refund' className='hover:underline cursor-pointer hover:text-white'>Refund Policy</Link>
                    <Link href='/policies/terms' className='hover:underline cursor-pointer hover:text-white'>Terms Of Service</Link>
                </div>
                <div className='flex flex-col items-start justify-start gap-2'>
                    <h1 className='font-bold text-white text-lg'>INFORMATION</h1>
                    <Link href='/policies/contact' className='hover:underline cursor-pointer'>Contact</Link>
                    <Link href='/policies/aboutus' className='hover:underline cursor-pointer'>About Us</Link>
                </div>
                <div className='flex flex-col items-start justify-start gap-2'>
                    <h1 className='font-bold text-lg text-white'>NEWSLETTER SIGN UP</h1>
                    <h3>Sign up for exclusive updates, new arrivals & insider only discounts</h3>
                    <div className='flex items-center justify-start gap-4 w-full'>
                        <input className='w-[80%] py-3 px-3 bg-[#232323] border-[1px] border-white' placeholder='Enter Your Email Address' />
                        <Button className='bg-white text-black font-extrabold rounded-none py-3 text-sm'>SUBMIT</Button>
                    </div>
                    <div>
                        <a href="https://www.facebook.com/samairafashionofficial" target='__blank'><FontAwesomeIcon icon={faFacebook} className='size-6 m-2 hover:scale-[1.2] transition-all cursor-pointer hover:text-blue-800' /></a>
                        <a href="https://www.instagram.com/samaira.fashion/" target='__blank'><FontAwesomeIcon icon={faInstagram} className='size-6 m-2 hover:scale-[1.2] transition-all cursor-pointer hover:text-pink-500' /></a>
                        <a href="https://www.pinterest.com/samairashop/" target='__blank'><FontAwesomeIcon icon={faPinterest} className='size-6 m-2 hover:scale-[1.2] transition-all cursor-pointer hover:text-red-500' /></a>
                    </div>
                </div>
            </div>
            <div className='w-full md:mt-0 mt-4 text-center p-2 font-bold text-white'>Samaira Fashion. All Rights Reserved.</div>
        </footer>
    );
};

export default Footer;
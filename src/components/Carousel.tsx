import React, { useEffect, useRef } from 'react'
import pic1 from "../assets/banner1.webp"
import pic2 from "../assets/banner2.webp"
import pic3 from "../assets/banner3.webp"
import pic4 from "../assets/banner5.png"
import pic5 from "../assets/banner5.webp"
import pic2ph from "../assets/pic2ph.webp"
import pic1ph from "../assets/pic1ph.webp"
import Image from 'next/image'

function Carousel({ ...props }) {
    
    let counter = useRef(0);

    useEffect(() => {
        const slider = document.getElementById('slider');
        const bar = document.getElementById('bar');

        const interval = setInterval(() => {
            if (slider) {
                if (counter.current === 4) {
                    counter.current = 0;
                    Array.from(slider?.children)?.forEach(node => node.classList.replace('opacity-0', 'opacity-100'))
                } else {
                    Array.from(slider?.children)[5 - counter.current - 1]?.classList.replace('opacity-100', 'opacity-0');
                    counter.current+=1;
                }
                if (bar) Array.from(bar.children).forEach((node, index) => {
                    if (index === counter.current) {
                        node.classList.add('bg-white')
                        node.classList.add('scale-125')
                    }
                    else {
                        node.classList.remove('bg-white')
                        node.classList.remove('scale-125')
                    }
                })
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [])

    return (
        <>

            <div {...props} className='w-[100vw] h-[90vh] animate-animate-appear cursor-pointer relative overflow-hidden m-auto'>
                <div className='w-full h-full absolute top-0 left-0 transition duration-500 scroll-smooth opacity-0' id='slider'>
                    <Image fill={true} alt='' src={window.screen.width > 500 ? pic3 : pic1ph} className='absolute left-0 top-0 w-full md:h-full h-[90%] transition-opacity duration-500 opacity-100  md:object-cover object-cover' />
                    <Image fill={true} alt='' src={window.screen.width > 500 ? pic1 : pic2ph} className='absolute transition-opacity duration-500 opacity-100 left-0 top-0 w-full md:h-full md:object-cover h-[90%]' />
                    <Image fill={true} alt='' src={window.screen.width > 500 ? pic2 : pic1ph} className='absolute transition-opacity duration-500 opacity-100 left-0 top-0 w-full md:h-full h-[90%] md:object-cover' />
                    <Image fill={true} alt='' src={window.screen.width > 500 ? pic5 : pic1ph} className='absolute transition-opacity duration-500 opacity-100 left-0 top-0 w-full md:h-full h-[90%] md:object-cover' />
                    <Image fill={true} alt='' src={window.screen.width > 500 ? pic4 : pic2ph} className='absolute transition-opacity duration-500 opacity-100 left-0 top-0 w-full md:h-full h-[90%] md:object-cover' onLoad={(e) => e.currentTarget.parentElement?.classList.replace('opacity-0', 'opacity-100')} />
                    {/* <img src={window.screen.width > 500 ? pic5 : pic1ph} className='absolute transition-opacity duration-500 opacity-100 left-0 top-0 w-full md:h-full h-[90%] md:object-cover' /> */}
                    <div id='bar' className='absolute flex items-center shadow-xl border-[1px] border-black justify-center gap-2 rounded-md bg-black opacity-40 px-2 md:bottom-10 bottom-56 left-[50%] translate-x-[-50%] p-1'>
                        <div className='rounded-full size-2 border-[1px] border-white bg-white scale-125'></div>
                        <div className='rounded-full size-2 border-[1px] border-white'></div>
                        <div className='rounded-full size-2 border-[1px] border-white'></div>
                        <div className='rounded-full size-2 border-[1px] border-white'></div>
                        <div className='rounded-full size-2 border-[1px] border-white'></div>
                        {/* <div className='rounded-full size-2 border-[1px] border-white'></div> */}
                    </div>
                </div>
            </div>

        </>
    );
}

export default Carousel;

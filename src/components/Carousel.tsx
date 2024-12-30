// "use client"

// import React, { useState } from 'react'
import Image from 'next/image'

function Carousel({ ...props }) {
    
    // let counter = useRef(0);
    // const [windowSt, setWindow] = useState<any>(null);

    // useEffect(() => {

    //     if (typeof window !== 'undefined') {
    //         // detect window screen width function
    //         setWindow(window);
    //     }

    //     const slider = document.getElementById('slider');
    //     const bar = document.getElementById('bar');

    //     const interval = setInterval(() => {
    //         if (slider) {
    //             if (counter.current === 4) {
    //                 counter.current = 0;
    //                 Array.from(slider?.children)?.forEach(node => node.classList.replace('opacity-0', 'opacity-100'))
    //             } else {
    //                 Array.from(slider?.children)[5 - counter.current - 1]?.classList.replace('opacity-100', 'opacity-0');
    //                 counter.current+=1;
    //             }
    //             if (bar) Array.from(bar.children).forEach((node, index) => {
    //                 if (index === counter.current) {
    //                     node.classList.add('bg-white')
    //                     node.classList.add('scale-125')
    //                 }
    //                 else {
    //                     node.classList.remove('bg-white')
    //                     node.classList.remove('scale-125')
    //                 }
    //             })
    //         }
    //     }, 5000);

    //     return () => clearInterval(interval);
    // }, [])

    return (
        <>

            <div {...props} className='w-[100vw] h-[90vh] animate-animate-appear cursor-pointer relative overflow-hidden m-auto'>
                <div className='w-[100vw] h-[90vh] absolute top-0 left-0 transition duration-500 scroll-smooth opacity-0' id='slider'>
                    {/* <Image fill={true} alt='' src={windowSt?.screen.width > 500 ? "/banner3.webp" : "/pic1ph.webp"} className='absolute left-0 top-0 w-full md:h-full h-[90%] transition-opacity duration-500 opacity-100  md:object-cover object-cover' />
                    <Image fill={true} alt='' src={windowSt?.screen.width > 500 ? "/banner1.webp" : "/pic2ph.webp"} className='absolute transition-opacity duration-500 opacity-100 left-0 top-0 w-full md:h-full md:object-cover h-[90%]' />
                    <Image fill={true} alt='' src={windowSt?.screen.width > 500 ? "/banner2.webp" : "/pic1ph.webp"} className='absolute transition-opacity duration-500 opacity-100 left-0 top-0 w-full md:h-full h-[90%] md:object-cover' />
                    <Image fill={true} alt='' src={windowSt?.screen.width > 500 ? "/banner5.webp" : "/pic1ph.webp"} className='absolute transition-opacity duration-500 opacity-100 left-0 top-0 w-full md:h-full h-[90%] md:object-cover' /> */}
                    <Image fill={true} priority={true} alt='' src={window?.screen.width > 500 ? "/banner5.png" : "/pic2ph.webp"} className='absolute transition-opacity duration-500 opacity-100 left-0 top-0 box-border w-[100vw] md:h-[90vh] h-[90%] ' onLoad={(e) => e.currentTarget.parentElement?.classList.replace('opacity-0', 'opacity-100')} />
                    {/* <div id='bar' className='absolute flex items-center shadow-xl border-[1px] border-black justify-center gap-2 rounded-md object-cover bg-black opacity-40 px-2 md:bottom-10 bottom-[30px] left-[50%] translate-x-[-50%] p-1'>
                        <div className='rounded-full size-2 border-[1px] border-white bg-white scale-125'></div>
                        <div className='rounded-full size-2 border-[1px] border-white'></div>
                        <div className='rounded-full size-2 border-[1px] border-white'></div>
                        <div className='rounded-full size-2 border-[1px] border-white'></div>
                        <div className='rounded-full size-2 border-[1px] border-white'></div>
                    </div> */}
                </div>
            </div>

        </>
    );
}

export default Carousel;

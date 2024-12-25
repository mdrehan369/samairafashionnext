"use client"

import React, { useEffect, useState } from 'react'
import { Container, Spinner, Button, Card } from '@/components'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

function Shop() {

    const params = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(true);
    const [page, setPages] = useState(1);
    const [maxPages, setMaxPages] = useState(100);
    const [limit, setLimit] = useState(12);
    const [productLoader, setProductLoader] = useState(true);
    const [sort, setSort] = useState({
        attribute: 'price',
        order: '-1'
    });
    const [windowSt, setWindowState] = useState<any>(null)

    useEffect(() => {

        if (typeof window !== 'undefined') {
            setWindowState(window);
        }

        ; (async () => {
            setProductLoader(true);
            try {
                console.log(params)
                const response = await axios.get(`/api/v1/products/category?category=${params.get("category")}&limit=${limit}&page=${page}&attribute=${sort.attribute}&order=${sort.order}`, {
                    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, withCredentials: true
                });
                setProducts(response.data.data);
                if (response.data.data.length < limit) {
                    setMaxPages(page);
                }
            } catch (err) {
                console.log(err)
            } finally {
                setLoader(false);
                setProductLoader(false);
                windowSt?.scrollTo(0, 0);
            }
        })();
    }, [limit, page, sort, params.get("category")]);

    return (
        !loader ?
            <Container className='flex flex-col items-center justify-start gap-6'>
                <div className='self-end md:mr-20 my-10 flex items-center justify-start gap-6 md:w-auto w-full'>
                    <div className='w-fit ml-4'>
                        <label htmlFor="sort" className='text-stone-700 dark:text-white font-bold text-xs mr-3'>SORT BY</label>
                        <select name='sort' defaultValue={'price,-1'} className='text-gray-600 dark:text-gray-400 bg-transparent border-[1px] text-sm font-medium border-gray-400 rounded-none px-5 py-3'
                        onInput={(e) => {
                            const val = e.currentTarget.value.split(',');
                            const attribute = val[0];
                            const order = val[1];
                            setSort({
                                attribute,
                                order
                            })
                        }}
                        >
                            <option className='outline-none' value='price,1'>Price, Low To High</option>
                            <option className='outline-none' value='price,-1'>Price, High To Low</option>
                            <option className='outline-none' value='createdAt,1'>Date, Old To New</option>
                            <option className='outline-none' value='createdAt,-1'>Date, New To Old</option>
                            <option className='outline-none' value='title,1'>Alphabetically, A-Z</option>
                            <option className='outline-none' value='title,-1'>Alphabetically, Z-A</option>
                        </select>
                    </div>
                    <div className='w-fit'>
                        <label htmlFor="items" className='font-semibold md:w-auto w-fit text-xs mr-3 dark:text-white text-stone-700'>ITEMS PER PAGE</label>
                        <select id='items' className=' text-gray-600 dark:text-gray-400 bg-transparent font-medium text-sm border-[1px] border-gray-400 rounded-none px-5 py-3' onChange={(e) => { setLimit(Number(e.target.value)) }} value={limit}>
                            <option value="6">6</option>
                            <option value="9">9</option>
                            <option value="12">12</option>
                            <option value="15">15</option>
                            <option value="18">18</option>
                        </select>
                    </div>
                </div>
                <div className='w-[95%] h-auto grid grid-cols-2 md:grid-cols-4 gap-4'>
                    {products.map((res, index) => <Card res={res} key={index} productLoader={productLoader} />)}
                </div>
                <div className='w-[85%] flex items-center justify-between'>
                    <Button className={`md:w-[10%] w-auto py-3 bg-transparent ${page === 1 && 'invisible'} border-[1px] border-black text-black font-extrabold text-lg shadow-none hover:bg-black hover:text-white transition-colors duration-300 rounded-none`} onClick={() => { setPages(page - 1); windowSt?.scrollTo(0, 0); }} disabled={page === 1}>
                        Back
                    </Button>
                    <Button className={`md:w-[10%] w-auto py-3 bg-transparent border-[1px] ${page === maxPages && 'invisible'} border-black text-black font-extrabold text-lg shadow-none hover:bg-black hover:text-white transition-colors duration-300 rounded-none`} onClick={() => { setPages(page + 1); windowSt?.scrollTo(0, 0); }} disabled={page === maxPages}>
                        Next
                    </Button>
                </div>
            </Container>
            : <Spinner className='h-[90vh] flex items-center justify-center' />
    )
}

export default Shop
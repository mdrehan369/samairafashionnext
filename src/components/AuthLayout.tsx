import React, { useEffect, useState } from 'react'
import Spinner from './Spinner.jsx';
import { login, setLocation } from "@/lib/features/authSlice.js"
import { setTheme } from "@/lib/features/themeSlice.js"
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '@/lib/hooks.js';

function AuthLayout({ children }: { children: React.ReactNode }) {

    const dispatch = useAppDispatch();
    const [loader, setLoader] = useState(true);
    const theme = useAppSelector(state => state.theme.theme);

    useEffect(() => {
        if (theme === null && localStorage.getItem("theme") !== null) {
            if (localStorage.getItem("theme") === 'light') {
                document.documentElement.classList.remove('dark')
            } else {
                document.documentElement.classList.add('dark')
            }
            dispatch(setTheme(localStorage.getItem("theme")))
        } else if (theme === null) {
            localStorage.setItem("theme", 'light');
            document.documentElement.classList.remove('dark')
            dispatch(setTheme('light'));
        }
    }, [])

    useEffect(() => {
        ; (async () => {
            try {

                let country;

                const response = await axios.get(`https://api.geoapify.com/v1/ipinfo?apiKey=${process.env.VITE_GEOAPI_KEY}`)
                if (response.data.country.iso_code === 'IN') country = 'IN'
                else country = 'AED'
                const rateResponse = await axios.get('https://www.floatrates.com/daily/aed.json');
                const dirham_to_rupees = Math.round(rateResponse.data.inr.rate);

                if (country === 'IN') {
                    dispatch(setLocation({ isIndia: true, dirham_to_rupees }))
                } else {
                    dispatch(setLocation({ isIndia: false, dirham_to_rupees }))
                }
                
            } catch (err) {
                console.log(err);
            } finally {
                setLoader(false);
            }

        })();
    }, []);

    useEffect(() => {
        ; (async () => {
            try {
                const response = await axios.get("/api/v1/users/user", {
                    baseURL: process.env.VITE_BACKEND_URL,
                    withCredentials: true
                });
                dispatch(login(response.data.data))
            } catch (err) {
                console.log(err);
            }

        })();
    }, [])

    return (
        !loader ?
            <>
                {children}
            </> :
            <Spinner className='w-[100vw] h-[100vh]' />
    )
}

export default AuthLayout
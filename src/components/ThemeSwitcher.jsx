import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import useStorage from "../hooks/useStorage.js";

export default function ThemeSwitcher() {
    const { getStorageItem, setStorageItem } = useStorage()
    const [isDarkTheme, setDarkTheme] = useState(getStorageItem('dark', window.matchMedia('(prefers-color-scheme: dark)').matches))

    if (isDarkTheme) document.body.setAttribute("data-bs-theme", "dark")
    const checkHandler = (e) => {
        setDarkTheme(e.target.checked)
        setStorageItem('dark', String(e.target.checked))
        document.body.setAttribute("data-bs-theme", e.target.checked ? 'dark' : 'light')
    }
    const mediaHandler = (e) => {
        if (getStorageItem('dark', null) === null) {
            document.body.setAttribute("data-bs-theme", e.matches ? 'dark' : 'light')
            setDarkTheme(e.matches)
            // setStorageItem('dark', String(e.matches))
        }
    }
    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', mediaHandler)
        return () => {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', mediaHandler)
        }
    }, [])

    return (
        <>
            Dark theme
            <Form.Check className="ms-3"
                type="switch"
                id="theme-switch"
                label=""
                onChange={checkHandler}
                checked={isDarkTheme}
            />
        </>
    )
}
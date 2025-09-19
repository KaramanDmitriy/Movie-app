import { Container } from "react-bootstrap";
import SearchForm from "../components/SearchForm.jsx";
import MoviesList from "../components/MoviesList.jsx";
import { useState } from "react";
import LoaderOverlay from "../components/LoaderOverlay.jsx";
import { delay } from "../helpers.js";
import { toast } from "react-toastify";
import useStorage from "../hooks/useStorage.js";
import { createContext } from "react";

export const TypeContext = createContext()

export default function HomePage() {
    const [moviesList, setMoviesList] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [inProgress, setInProgress] = useState(false)
    const { getItem, setItem } = useStorage()
    const [type, setType] = useState('')

    const searchHandler = async (params) => {
        setType(params.type)
        setInProgress(true)
        const storeKey = params.search.replaceAll(' ', '_') + '_' + params.type
        const cachedList = getItem(storeKey)
        if (cachedList) {
            setMoviesList(cachedList.results)
            setTotalPages(cachedList.total_pages)
            setTotalItems(cachedList.total_results)
            setInProgress(false)
            return
        }
        const url = `https://api.themoviedb.org/3/search/${params.type}?include_adult=false&language=en-US&page=1&query=${params.search}`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + import.meta.env.VITE_API_TOKEN_TMDB
            }
        };

        try {
            const response = await fetch(url, options);
            if (response.ok) {
                const data = await response.json();
                setItem(storeKey, data)
                setMoviesList(data.results)
                setTotalPages(data.total_pages)
                setTotalItems(data.total_results)

            } else {
                throw new Error(`Error fetching data. Status: ${response.status}`);
            }
        }
        catch (error) {
            toast.error('Some error occured. ')
        }
        finally {
            await delay(1000)
            setInProgress(false)
        }
    }

    return (
        <>
            <TypeContext value={type}>
                {inProgress && <LoaderOverlay />}
                <Container className='my-4'>
                    <SearchForm onSearch={searchHandler} />
                    <MoviesList items={moviesList} total={totalItems} />
                </Container>
            </TypeContext>
        </>

    )
}
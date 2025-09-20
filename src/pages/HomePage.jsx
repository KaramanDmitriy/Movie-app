import { Container } from "react-bootstrap";
import SearchForm from "../components/SearchForm.jsx";
import MoviesList from "../components/MoviesList.jsx";
import { useEffect, useState } from "react";
import LoaderOverlay from "../components/LoaderOverlay.jsx";
import { delay } from "../helpers.js";
import { toast } from "react-toastify";
import useStorage from "../hooks/useStorage.js";
import { createContext } from "react";
import CustomPagination from "../components/CustomPagination.jsx";
import { useCommonStore } from "../store.js";

export const TypeContext = createContext()

export default function HomePage() {
    const store = useCommonStore()
    const [moviesList, setMoviesList] = useState(store.moviesList)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(store.totalPages)
    const [totalItems, setTotalItems] = useState(store.totalResults)
    const [inProgress, setInProgress] = useState(false)
    const [search, setSearch] = useState(store.searchQuery)
    const { getStorageItem, setStorageItem } = useStorage()
    const [type, setType] = useState(store.searchType)

    const searchHandler = async (params) => {
        setType(params.type)
        setSearch(params.search)
        searchMovies(params.search, params.type, page)
    }
    const pageHandler = (newPage) => {
        setPage(newPage)
        searchMovies(search, type, newPage)
    }

    const searchMovies = async (search, type, page) => {
        if (!search || !type) return false
        setInProgress(true)
        const storeKey = search.replaceAll(' ', '-').replaceAll('_', '-') + '_' + type + '_' + page

        const cachedList = getStorageItem(storeKey, null, 'session')
        if (cachedList) {
            setMoviesList(cachedList.results)
            setTotalPages(cachedList.total_pages)
            setTotalItems(cachedList.total_results)
            store.setMoviesList(cachedList.results)
            store.setTotalPages(cachedList.total_pages)
            store.setTotalResults(cachedList.total_results)
            setInProgress(false)
            return
        }
        const url = `https://api.themoviedb.org/3/search/${type}?include_adult=false&language=en-US&page=${page}&query=${search}`;
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
                data.total_results && setStorageItem('storeKey', storeKey, 'session')
                data.total_results && setStorageItem(storeKey, data, 'session')
                setMoviesList(data.results)
                setTotalPages(data.total_pages)
                setTotalItems(data.total_results)

                store.setMoviesList(data.results)
                store.setTotalPages(data.total_pages)
                store.setTotalResults(data.total_results)

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
    const storedSearch = () => {
        const storeKey = getStorageItem('storeKey', null, 'session')
        if (storeKey) {
            const cachedList = getStorageItem(storeKey, null, 'session')
            if (cachedList) {
                store.setMoviesList(cachedList.results)
                store.setTotalPages(cachedList.total_pages)
                store.setTotalResults(cachedList.total_results)
                setMoviesList(cachedList.results)
                setTotalPages(cachedList.total_pages)
                setTotalItems(cachedList.total_results)
                const [search, type, page] = storeKey.split('_')
                store.setSearchQuery(search)
                store.setSearchType(type)
                setSearch(search)
                setType(type)
                setPage(page)
            }
        }
    }
    useEffect(() => {
        storedSearch()
    }, [])

    return (
        <>
            <TypeContext value={type}>
                {inProgress && <LoaderOverlay />}
                <Container className='my-4'>
                    <SearchForm onSearch={searchHandler} />
                    <MoviesList items={moviesList} total={totalItems} />
                    <CustomPagination onPageChange={pageHandler} page={page} total={totalPages} />
                </Container>
            </TypeContext>
        </>
    )
}
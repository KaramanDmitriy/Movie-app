import { Card } from "react-bootstrap"
import ResultItem from "../components/ResultItem"
import useStorage from "../hooks/useStorage"
import { useState } from "react"
export default function FavoritesPage() {
    const { getStorageItem } = useStorage()
    const [favList, setFavList] = useState(getStorageItem('favorites', []))
    return (
        <Card className="mt-4">
            <Card.Body className="movies-grid">
                {favList.map((item, index) => <ResultItem key={index} data={item} favCallback={() => setFavList(getStorageItem('favorites', []))} />)}
            </Card.Body>
        </Card >
    )
}
import { Card } from "react-bootstrap"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ResultItem from "../components/ResultItem"
import useStorage from "../hooks/useStorage"
import { useState } from "react"
export default function FavoritesPage() {
    const { getStorageItem } = useStorage()
    const [favList, setFavList] = useState(getStorageItem('favorites', []))
    const filteredItems = (type) => {
        return <div className="movies-grid">
            {favList
                .filter(el => el.type === type)
                .map((item, index) => <ResultItem key={index} data={item} favCallback={() => setFavList(getStorageItem('favorites', []))} />)}
        </div>
    }

    return (
        <Card className="mt-4">
            <Card.Body>
                <Tabs
                    defaultActiveKey="movies"
                    id="uncontrolled-tab-example"
                    className="mb-3">

                    <Tab eventKey="movies" title="Movies">
                        {filteredItems('movie')}
                    </Tab>


                    <Tab eventKey="tv" title="TV Shows">
                        {filteredItems('tv')}
                    </Tab>


                    <Tab eventKey="persons" title="Persons">
                        {filteredItems('person')}
                    </Tab>
                </Tabs>


            </Card.Body>
        </Card >
    )
}
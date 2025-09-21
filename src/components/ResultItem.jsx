import { Card, Button } from "react-bootstrap";
import noImage from './../assets/images/reklama.jpg'
import { formanDate } from "../helpers";
import { useContext, useState } from "react";
import { TypeContext } from "../pages/HomePage.jsx";
import { NavLink } from "react-router";
import useStorage from "../hooks/useStorage.js";



export default function ResultItem({ data }) {
    const type = data.type || useContext(TypeContext)
    const IMG_BASE = 'https://image.tmdb.org/t/p/w500/'
    const { setStorageItem, getStorageItem } = useStorage()
    const [isInFav, setIsInFav] = useState(Boolean(getStorageItem('favorites', []).find(el => el.id === data.id)))


    let title = '', date = '', imageSrc = ''
    switch (type) {
        case 'movie':
            title = data.title
            date = data.release_date
            imageSrc = data.poster_path ? IMG_BASE + data.poster_path : noImage
            break;
        case 'tv':
            title = data.name
            date = data.first_air_date
            imageSrc = data.poster_path ? IMG_BASE + data.poster_path : noImage
            break;
        case 'person':
            title = data.name
            date = null
            imageSrc = data.profile_path ? IMG_BASE + data.profile_path : noImage
            break;
        default:
            return <p>Unknown type</p>
    }
    const favHandler = () => {
        const favItems = getStorageItem('favorites', [])
        const favIndex = favItems.findIndex(el => el.id === data.id)
        if (favIndex !== -1) {
            setIsInFav(false)
            setStorageItem('favorites', favItems.toSpliced(favIndex, 1))
        } else {
            setIsInFav(true)
            const favItem = {
                id: data.id,
                type,
                [type === 'movie' ? 'title' : 'name']: title,
                [type === 'movie' ? 'release_date' : 'first_air_date']: date,
                [type === 'person' ? 'profile_path' : 'poster_path']: imageSrc
            }
            setStorageItem('favorites', [...favItems, favItem])
        }

    }

    return (
        <Card className="mb-3">
            <Card.Img src={imageSrc} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>Rating: {data.vote_average} ({data.vote_count} votes)</Card.Text>
                <Card.Text>
                    {date && <time datatime={date} >{formanDate(date)}</time> || data.known_for_department}
                </Card.Text>
                <NavLink to={`/detail/${type}/${data.id}`} className={'btn btn-info'}>Detail</NavLink>
                <Button className='btn btn-danger ms-3' onClick={favHandler} >{isInFav ? '❤︎' : '♡'}</Button>
            </Card.Body>
        </Card >
    )
}


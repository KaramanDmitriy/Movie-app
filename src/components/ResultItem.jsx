import { Card } from "react-bootstrap";
import noImage from './../assets/images/reklama.jpg'
import { formanDate } from "../helpers";
import { useContext } from "react";
import { TypeContext } from "../pages/HomePage.jsx";
import { NavLink } from "react-router";


export default function ResultItem({ data }) {
    const type = useContext(TypeContext)
    const IMG_BASE = 'https://image.tmdb.org/t/p/w500/'

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

    return (
        <Card className="mb-3">
            <Card.Img src={imageSrc} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>Rating: {data.vote_average} ({data.vote_count} votes)</Card.Text>
                <Card.Text>
                    {date && <time datatime={date} >{formanDate(date)}</time> || data.known_for_department}
                </Card.Text>
                {/* <Button data-id={data.id}>Detail</Button> */}
                <NavLink to={`/detail/${type}/${data.id}`} className={'btn btn-info'}>Detail</NavLink>
            </Card.Body>
        </Card >
    )
}


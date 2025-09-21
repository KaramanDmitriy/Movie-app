import { Card } from "react-bootstrap";
import ResultItem from "./ResultItem.jsx";
import '../assets/scss/MoviesList.scss'

export default function MoviesList(props) {
    return (
        <Card className="mt-4">
            <Card.Header><h3>Search result: {props.total}</h3></Card.Header>
            <Card.Body className="movies-grid">
                {props.items.map((item, index) => <ResultItem key={index} data={item} />)}
            </Card.Body>
        </Card >
    )
}
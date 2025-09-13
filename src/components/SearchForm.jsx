import { useState } from 'react'
import { Card, Row, Col, Form, Button } from 'react-bootstrap'
import '../assets/scss/SearchForm.scss'

export default function SearchForm(props) {
    const [search, setSearch] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        props.onSearch(search)
    }

    return (
        <Card>
            <Card.Body>
                <form onSubmit={submitHandler}>
                    <Row>
                        <Col><p>Logo</p></Col>
                        <Col><Form.Control type='search' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search...' />
                        </Col>
                        <Col><Button className='btn btn-info' type='submit' variant="outline-secondary">
                            Search
                        </Button></Col>
                    </Row>
                </form>
            </Card.Body>
        </Card >
    )
}
import { useState } from 'react'
import { Card, Row, Col, Form, Button } from 'react-bootstrap'
import '../assets/scss/SearchForm.scss'
import { toast } from 'react-toastify'

export default function SearchForm(props) {
    const [search, setSearch] = useState('')
    const [type, setType] = useState('movie')

    const submitHandler = (e) => {
        e.preventDefault()
        const searchString = search.trim().toLowerCase()
        if (searchString === '') return toast.warning('Enter search text')
        props.onSearch({ search: searchString, type })
    }

    return (
        <Card>
            <Card.Body>
                <form onSubmit={submitHandler}>
                    <Row>
                        <Col><a className='logo' href='#'><img src='./logo.png'></img></a></Col>
                        <Col><Form.Control type='search' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search...' />
                        </Col>
                        <Col>
                            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
                                <option value='movie'>Movies</option>
                                <option value='tv'>TV shows</option>
                                <option value='person'>Persons</option>
                            </Form.Select>
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
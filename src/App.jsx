import SearchForm from './components/SearchForm.jsx'
import './assets/scss/app.scss'
import { Container } from 'react-bootstrap'
import { useState } from 'react'


function App() {
  const [moviesList, setMoviesList] = useState([])
  const searchHandler = async (search) => {
    const type = 'movie'
    const year = ''
    const response = await fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&s=${search}&type=${type}&y=${year}`);
    const data = await response.json();
    setMoviesList(data.Search)
    console.log(data.Search);
  }

  return (
    <Container className='my-4'>
      <h1>Movie App</h1>
      <SearchForm onSearch={searchHandler} />
    </Container>
  )
}

export default App

import './assets/scss/app.scss'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import { Outlet, NavLink } from 'react-router'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Movies App</Navbar.Brand>
          <Nav className="me-auto my-2 my-lg-0">
            <NavLink className="me-3" to="/">Home</NavLink>
            <NavLink to="/about" className="me-3">About</NavLink>
            <NavLink to="/favorites">Favorites</NavLink>
          </Nav>
        </Container>
      </Navbar>
      <Container className='my-4'>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </Container>
      <ToastContainer position="top-center" autoClose={3000} theme="dark" />

    </>
  )
}


export default App


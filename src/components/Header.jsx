import {Navbar, Nav, Container, Button} from 'react-bootstrap'
import {FaPlus, FaList, FaTree, FaDatabase} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
const Header = () => {
  const navigate = useNavigate()
  return (
    <header>
      <Navbar
        bg='dark'
        expand='sm'
        collapseOnSelect
        className='text-center'
      >
        <Container className='justify-content-center'>
          <Nav className='ms-auto'>
            <Navbar.Brand className='text-white'>
              <FaDatabase/><FaTree/> Data Trees
            </Navbar.Brand>
            <Button
              type='button'
              variant='primary'
              className='p-auto text-white'
              onClick={() => navigate('/trees/list')}
            >
              <FaList/> List
            </Button>
            <div className="px-1 py-1"/>
            <Button
              type='button'
              variant='primary'
              className='p-auto text-white'
              onClick={() => navigate('/trees/add')}
            >
              <FaPlus/> Add
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}
export default Header
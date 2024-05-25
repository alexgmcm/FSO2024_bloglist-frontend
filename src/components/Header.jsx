import LogoutButton from './LogoutButton'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Link } from 'react-router-dom'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
const {userState, userDispatch} = useContext(UserContext)

//{userState ? {userState.name} logged in.{' '} : <></>}
if (userState) {
return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">

    <Nav.Link href="#" as="span">
    <Link to='/'> blogs </Link>
</Nav.Link>

    <Nav.Link href="#" as="span">
    <Link to='/users'> users </Link>
    </Nav.Link>
    <Nav.Link href="#" as="span">
        {userState
          ? <em >{userState.name} logged in</em>
          : <></>
        }
      </Nav.Link>

    
    <LogoutButton userDispatch={userDispatch} userState={userState} />
    </Nav>
  </Navbar.Collapse>
 
</Navbar>
   
    <div className="container">
    <h2>blogs</h2>
            </div>
            </>
)
}
else {
    return <></>
}
}

export default Header
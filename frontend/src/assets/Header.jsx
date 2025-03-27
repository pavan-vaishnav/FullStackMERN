import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from 'react-router-dom'
import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from '../context/auth';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Searchinput from './Searchinput';
import { useCart } from '../context/cart';
function Header() {
  const [auth,setAuth]=useAuth() 
  const [cart,setCart]=useCart()
  function handlelogout()
  {
    localStorage.removeItem("auth")
    setAuth({
      user:null,
      token:""
    })
  }
  return (
    <div>
<Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand to="/">Online-Shopping</Navbar.Brand>
          <Searchinput/>
          <Nav className="">
            <NavLink to="/">Home</NavLink>
            
            {
              !auth.user?(<>
              <NavLink to="/Signin">Signin</NavLink>
              <NavLink to="/Signup">Signup</NavLink>
              </>):(<>
                <NavDropdown title={auth.user.name} id="basic-nav-dropdown">
              <NavLink to={`/dashboard/${auth?.user?.role===1?"admin":"user"}`} className="dropdown-item">Dashboard</NavLink>
              <NavLink to="/Signin"  className="dropdown-item" onClick={handlelogout}>Signout</NavLink>
            </NavDropdown>
              </>)
            }
            
            <NavLink to="/Cart"><GiShoppingBag /><sup>{cart.length}</sup></NavLink>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
import React from 'react';
import { Navbar, Nav, Container,Button} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { logout } from '../redux/authSlice';
const AdminHeader = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate();
  const handleLogout = () => {  
    dispatch(logout());
    navigate("/") 
  };

  return (
    <Navbar bg="success" variant="dark" expand="lg">
    <Container>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="me-auto"> {/* Push items to the left */}
          <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
          <Nav.Link as={Link} to="/recipes">Recipes</Nav.Link>
          <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
        </Nav>
        <Button variant="primary" onClick={handleLogout}>Logout</Button> {/* Logout button at right */}
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default AdminHeader;

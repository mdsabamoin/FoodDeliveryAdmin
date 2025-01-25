import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';  // Import Link for routing

const AdminHeader = () => {
  return (
    <Navbar bg="success" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
            <Nav.Link as={Link} to="/recipes">Recipes</Nav.Link>
            <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminHeader;

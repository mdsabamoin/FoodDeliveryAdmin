import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
 
 const Header = ()=>{
    return (
        <Navbar bg="light" expand="lg" className="shadow-sm">
  <Container>
    <Navbar.Brand href="#" className="fw-bold fs-4 text-primary">
      Food Delivery
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mx-auto"> {/* Center the navigation links */}
        <Nav.Link href="#home" className="me-3 fs-3 ">
          Admin
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

      );
 }


 export default Header;
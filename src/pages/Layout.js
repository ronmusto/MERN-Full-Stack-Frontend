import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Layout = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Login</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/AI">House AI</Nav.Link>
            <Nav.Link as={Link} to="/dashboard">Data</Nav.Link>
            <Nav.Link as={Link} to="/travel">Travel</Nav.Link>
            <Nav.Link as={Link} to="/account">Account</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;

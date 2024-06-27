import LayoutStyles from '../CSS/Layout.module.css'; // Import as LayoutStyles
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Layout = () => {
  return (
    <div>
      <Navbar 
        className={LayoutStyles.layoutHeader} 
        bg="dark" variant="dark" expand="lg"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/">About Me</Navbar.Brand> 
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
            <Nav className={LayoutStyles.layoutNavList}>
              <Nav.Link as={Link} to="/resume" className={LayoutStyles.layoutNavLink}>Resume</Nav.Link>
              <Nav.Link as={Link} to="/dashboard" className={LayoutStyles.layoutNavLink}>Data</Nav.Link>
              <Nav.Link as={Link} to="/travel" className={LayoutStyles.layoutNavLink}>Travel</Nav.Link>
              <Nav.Link as={Link} to="/account" className={LayoutStyles.layoutNavLink}>Account</Nav.Link>
              <Nav.Link as={Link} to="/login" className={LayoutStyles.layoutNavLink}>Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Outlet /> 
      </Container>
    </div>
  );
};

export default Layout;

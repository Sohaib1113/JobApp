import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './CustomNavbar.css'; // Ensure you import your CSS

function CustomNavbar({ userRole }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleNavItemClick = (path) => {
    setExpanded(false); // Collapse the navbar after navigating
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <Navbar expanded={expanded} bg="primary" variant="dark" expand="lg" className="custom-navbar">
      <Container fluid>
       
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Other navigation items if needed */}
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="#" onClick={handleLogout} className="logout-button">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;

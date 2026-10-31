import { NavLink } from "react-router-dom";
import { Container, Nav, Navbar as BsNavbar } from "react-bootstrap";

function Navbar() {
  return (
    <BsNavbar expand="sm" className="topbar" variant="dark">
      <Container>
        <BsNavbar.Brand as={NavLink} to="/">Student Management</BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="main-nav" />
        <BsNavbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>Dashboard</Nav.Link>
            <Nav.Link as={NavLink} to="/students" end>Students</Nav.Link>
            <Nav.Link as={NavLink} to="/students/add">Add student</Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;

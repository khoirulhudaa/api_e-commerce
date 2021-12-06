import React, {Component} from 'react';
import {Navbar, Container, Nav, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';

export default class NavbarComponent extends Component { 
    render() {        
        return (
            <Navbar bg="light" expand="lg" className="p-4">
                <Container>
                <Navbar.Brand href="#">Shoopies</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                    >
                    <Nav.Link href="#action1">Home</Nav.Link>
                    <Nav.Link href="#action2">Promosi</Nav.Link>
                    <NavDropdown title="Categories" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Makanan</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Minuman</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">Cemilan</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}
import React from 'react';

import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';


const Navigation = () => (
        <Navbar sticky="top" bg="dark" variant="dark">
            <Navbar.Brand href="#home">
                <img
                    alt=""
                    src="/logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />
                {' React Bootstrap'}
            </Navbar.Brand>
            <Navbar.Collapse className="d-flex justify-content-end">
                <Nav
                    activeKey="/home"
                    className="d-flex justify-content-end"
                    onSelect={selectedKey => alert(`selected ${selectedKey}`)}
                >
                    <Nav.Item>
                        <Nav.Link as={Link} to={ROUTES.LANDING}>Landing</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to={ROUTES.HOME}>Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to={ROUTES.ACCOUNT}>Account</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to={ROUTES.ADMIN}>Admin</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to={ROUTES.SIGN_IN}>Sign In</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
);

export default Navigation;
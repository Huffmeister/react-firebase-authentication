import React from 'react';

import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

import {AuthUserContext} from '../Session';
import SignOutButton from '../SignOut';

import { Nav, Navbar } from 'react-bootstrap';

const Navigation = () => (
    <div>
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
                        <LandingItem/>
                        <HomeItem/>
                        <AccountItem/>
                        <AdminItem/>
                        <AuthUserContext.Consumer>
                            {authUser =>
                                authUser ? <SignOutItem/> : <SignInItem/>
                            }
                        </AuthUserContext.Consumer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
    </div>
);

const LandingItem = () => (
    <Nav.Item>
        <Nav.Link as={Link} to={ROUTES.LANDING}>Landing</Nav.Link>
    </Nav.Item>
);

const HomeItem = () => (
    <Nav.Item>
        <Nav.Link as={Link} to={ROUTES.HOME}>Home</Nav.Link>
    </Nav.Item>
);

const AccountItem = () => (
    <Nav.Item>
        <Nav.Link as={Link} to={ROUTES.ACCOUNT}>Account</Nav.Link>
    </Nav.Item>
);

const AdminItem = () => (
    <Nav.Item>
        <Nav.Link as={Link} to={ROUTES.ADMIN}>Admin</Nav.Link>
    </Nav.Item>
);

const SignInItem = () => (
    <Nav.Item>
        <Nav.Link as={Link} to={ROUTES.SIGN_IN}>Sign In</Nav.Link>
    </Nav.Item>
);

const SignOutItem = () => (
    <Nav.Item>
        <SignOutButton/>
    </Nav.Item>
);

export default Navigation;

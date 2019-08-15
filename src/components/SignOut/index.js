import React from 'react';

import { withFirebase } from '../Firebase';

import { Nav, Button } from 'react-bootstrap';

const SignOutButton = ({ firebase }) => (
    <Nav.Item>
        <Button onClick={firebase.doSignOut}>Sign Out</Button>
    </Nav.Item>

);

export default withFirebase(SignOutButton);
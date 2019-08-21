import React from 'react';

import {AuthUserContext, withAuthorization} from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';


import {Col, Container, Row} from 'react-bootstrap';

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <Container>
                <h1>Account: {authUser.email}</h1>
                <hr/>
                <Row className="justify-content-md-center">
                    <Col className="col-6">
                        <PasswordForgetForm/>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col className="col-6">
                        <PasswordChangeForm />
                    </Col>
                </Row>
            </Container>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);

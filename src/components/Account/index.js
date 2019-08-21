import React from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

import {Col, Container, Row} from 'react-bootstrap';


const AccountPage = () => (
    <Container>
        <h1>Account Page</h1>
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
);

export default AccountPage;

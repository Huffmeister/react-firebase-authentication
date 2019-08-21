import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";

const PasswordForgetPage = () => (
    <div>
        <h1>PasswordForget</h1>
        <Container>
            <Row className="justify-content-md-center">
                <Col className="col-6">
                    <PasswordForgetForm />
                </Col>
            </Row>
        </Container>
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email } = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, error } = this.state;

        const isInvalid = email === '';

        return (
            <Form className="border bg-light p-3" onSubmit={this.onSubmit}>
                <h3>Reset Password</h3>
                <Form.Control
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <Button className="mt-2" disabled={isInvalid} type="submit">
                    Reset My Password
                </Button>
                {error && <Alert variant="danger">{error.message}</Alert>}
            </Form>
        );
    }
}

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };

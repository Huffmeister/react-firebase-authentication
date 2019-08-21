import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink} from "../PasswordForget";
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import {Form, Button, Container, Alert, Row, Col} from 'react-bootstrap';

const SignInPage = () => (
    <div>
        <h1>SignIn</h1>
        <Container>
            <Row className="justify-content-md-center">
                <Col className="col-6">
                    <SignInForm />
                </Col>
            </Row>
        </Container>
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
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
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <Form className="border bg-light p-3" onSubmit={this.onSubmit}>
                <Form.Control
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <Form.Control
                    className={"mt-1"}
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <Button className="mt-2" disabled={isInvalid} type="submit">
                    Sign In
                </Button>
                <hr/>
                <PasswordForgetLink/>
                <SignUpLink/>
                {error && <Alert className="mt-3" variant="danger">{error.message}</Alert>}
            </Form>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
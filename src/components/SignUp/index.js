import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Alert, Form, Button, Container, Row, Col } from 'react-bootstrap';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm/>
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const { username, email, passwordOne } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({error});
            });

        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            username = '',
            email = '',
            passwordOne = '',
            passwordTwo = '',
            error
        } = this.state;

        const isInvalid = (
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '');

        return (
            <Container>
                <Row>
                    <Col/>
                    <Col>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    name="username"
                                    value={username}
                                    onChange={this.onChange}
                                    type="text"
                                    placeholder={"Full Name"}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    value={email}
                                    onChange={this.onChange}
                                    type="text"
                                    placeholder={"Email Address"}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPasswordOne">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name="passwordOne"
                                    value={passwordOne}
                                    onChange={this.onChange}
                                    type="password"
                                    placeholder={"Password"}
                                />
                                <Form.Control
                                    name="passwordTwo"
                                    value={passwordTwo}
                                    onChange={this.onChange}
                                    type="password"
                                    placeholder={"Confirm Password"}
                                />
                            </Form.Group>
                            <Form.Group controlId={"formSubmit"}>
                                <Button disabled={isInvalid} type="submit">Sign Up</Button>
                            </Form.Group>
                            <Form.Group controlId={"formError"}>
                                {error && <Alert variant={'danger'}>{error.message}</Alert>}
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col/>
                </Row>
            </Container>
        );
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import {Alert, Button, Form} from "react-bootstrap";

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { passwordOne } = this.state;

        this.props.firebase
            .doPasswordUpdate(passwordOne)
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
        const { passwordOne, passwordTwo, error } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo || passwordOne === '';

        return (
            <Form className="border bg-light p-3" onSubmit={this.onSubmit}>
                <h3>Change Password</h3>
                <Form.Control
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="New Password"
                />
                <Form.Control
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm New Password"
                />
                <Button className="mt-2" disabled={isInvalid} type="submit">
                    Change My Password
                </Button>
                {error && <Alert variant="danger">{error.message}</Alert>}
            </Form>
        );
    }
}

export default withFirebase(PasswordChangeForm);

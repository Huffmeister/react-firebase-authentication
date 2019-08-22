import React, {Component} from 'react';

import {withFirebase} from "../Firebase";
import {ProgressBar, Table} from "react-bootstrap";

class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            users: [],
        }
    }

    componentDidMount() {
        this.setState({ loading: true});

        this.unsubscribe = this.props.firebase
            .users()
            .onSnapshot(snapshot => {
                let users = [];

                snapshot.forEach(doc =>
                    users.push({ ...doc.data(), uid: doc.id}),
                );

                this.setState({
                    users,
                    loading: false,
                });
            });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const {users, loading} = this.state;
        return (
            <div>
                <h1>Admin</h1>
                <hr/>
                {loading && <div>
                    <ProgressBar animated now={100} /> Loading...
                </div>}
                {!loading && <UserList users={users}/>}
            </div>
        );
    }
}

const UserList = ({users}) => (
    <div>
        <strong>Total users: </strong> {users.length}
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>ID</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.uid}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.uid}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
);

export default withFirebase(AdminPage);

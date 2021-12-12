import React from 'react';
import { Table, Button } from 'reactstrap';

 const CustomerComponent = (props) => {
    return (
        <div>
            <div>
                <Button
                    color="primary"
                >
                    New Customer
                </Button>
            </div>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Actions</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Customer</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default CustomerComponent;

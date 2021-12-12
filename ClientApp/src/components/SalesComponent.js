import React from 'react';
import { Table, Button } from 'reactstrap';

 const SalesComponent = (props) => {
    return (
        <div>
            <div>
                <Button
                    color="primary"
                >
                    New Sale
                </Button>
            </div>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Store</th>
                    <th>Date Sold</th>
                    <th>Actions</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Sa;es</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                </tbody>
            </Table>
        </div>

    )
}

export default SalesComponent;

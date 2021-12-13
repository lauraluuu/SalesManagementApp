import React from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';

const copyRightStyle = {
    font: "10px Arial, sans-serif"
};

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
            <div style={copyRightStyle}>&copy; 2020 - Laura Lu</div>
        </div>

    )
}

export default SalesComponent;

import React from 'react';
import { Table, Button } from 'reactstrap';

const copyRightStyle = {
    font: "10px Arial, sans-serif"
};

 const ProductComponent = (props) => {
    return (
        <div>
            <div>
                <Button
                    color="primary"
                >
                    New Product
                </Button>
            </div>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Product</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                </tbody>
            </Table>
            <div style={copyRightStyle}>&copy; 2020 - Laura Lu</div>
        </div>
    )
}

export default ProductComponent;

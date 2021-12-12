import React, { useState } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';

 const ProductComponent = (props) => {

    const copyRightStyle = {
        font: "10px Arial, sans-serif"
    };

    /* list products */
    const [productsList, setProductsList] = useState([
        {name: 'product1', price: 10},
        {name: 'product2', price: 20},
    ]);

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
                    {productsList.map(item => (
                        <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td><Button>EDIT</Button></td>
                            <td><Button>DELETE</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div style={copyRightStyle}>&copy; 2020 - Laura Lu</div>
        </div>
    )
}

export default ProductComponent;

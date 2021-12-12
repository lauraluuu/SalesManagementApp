import React, { useState } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';

 const StoreComponent = (props) => {
    const copyRightStyle = {
        font: "10px Arial, sans-serif"
    };

    /* list stores */
    const [storesList, setStoresList] = useState([
        {name: 'store1', address: 'Address 1'},
        {name: 'store2', address: 'Address 2'},
    ]);
    return (
        <div>
            <div>
                <Button
                    color="primary"
                >
                    New Store
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
                    {storesList.map(item => 
                        <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>{item.address}</td>
                            <td><Button>EDIT</Button></td>
                            <td><Button>DELETE</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div style={copyRightStyle}>&copy; 2020 - Laura Lu</div>
        </div>
    )
}

export default StoreComponent;

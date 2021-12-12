import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';

 const CustomerComponent = (props) => {
    const copyRightStyle = {
        font: "10px Arial, sans-serif"
    };

    /* list customers */
    const [customersList, setCustomersList] = useState([]);

    /* GET CUSTOMER LIST */
    const getCustomersList = () => {
        let URL = "https://localhost:7192/api/Customer/GetAll";

        axios.get(URL).then(response => {
            setCustomersList(response.data);
        })
    }

    useEffect(() => {
        getCustomersList();
        // return () => {
            
        // }
    }, [])

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
                    {customersList.map(item => 
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

export default CustomerComponent;

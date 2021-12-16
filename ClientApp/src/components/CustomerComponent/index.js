import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import CopyRight from '../CopyRight';
import AddCustomerModal from './AddCustomerModal';
import EditCustomerModal from './EditCustomerModal';
import DeleteCustomerModal from './DeleteCustomerModal';


 const CustomerComponent = (props) => {
    const [customersList, setCustomersList] = useState([]);

    /* GET CUSTOMERS LIST */
    const getCustomersList = () => {
        let URL = "https://localhost:7192/api/Customer/GetAll";

        axios.get(URL).then(response => {
            setCustomersList(response.data);
        })
    }
    
    useEffect(() => {
        getCustomersList();
    }, [])

    return (
        <div>
            <div>
                <AddCustomerModal getCustomersList={getCustomersList} />
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
                    {customersList.map(customer => 
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.address}</td>
                            <td><EditCustomerModal customer={customer} getCustomersList={getCustomersList} /></td>
                            <td><DeleteCustomerModal customer={customer} getCustomersList={getCustomersList} /></td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <CopyRight />
        </div>
    )
}

export default CustomerComponent;

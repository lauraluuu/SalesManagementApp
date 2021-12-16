import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import {  BsX } from "react-icons/bs";
import { Button as SemiButton, Modal, Form } from 'semantic-ui-react';
import CopyRight from '../CopyRight';
import AddCustomerModal from './AddCustomerModal';
import EditCustomerModal from './EditCustomerModal';
import DeleteCustomerModal from './DeleteCustomerModal';


 const CustomerComponent = (props) => {
    const [customersList, setCustomersList] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);

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


    /* UPDATE CUSTOMER */
    const [customerToEdit, setCustomerToEdit] = useState({ name: '', address: '' });
    const handleCustomerToEditInputChange = (event) => {
        const { name, value } = event.target;
        let customerToEditNewReference = { ...customerToEdit, [name]: value };
        setCustomerToEdit(customerToEditNewReference);
    }

    /* DELETE CUSTOMER */
    const handleCustomerDelete = (item) => {
        setCustomerToEdit(item);

        setOpenDelete(true);
    }

    const deleteCustomer = () => {
        axios.delete("https://localhost:7192/api/Customer/Delete", { data: customerToEdit }).then(response => {
            let customersNewReference = [...customersList];
            const index = customersNewReference.findIndex((item) => item.id === customerToEdit.id);
            customersNewReference.splice(index, 1);
            setCustomerToEdit({ name: '', address: '' });
            setCustomersList(customersNewReference);
            setOpenDelete(false);
        })
    }

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
                            <td><Button onClick={() => handleCustomerDelete(customer)} color="danger"><MdDelete color="white"/> DELETE</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <CopyRight />

            {/* Delete Modal */}
            <Modal
                size={"tiny"}
                centered={false}
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                onOpen={() => setOpenDelete(true)}
            >
                <Modal.Header>Delete Customer {customerToEdit.name}</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        Are you sure?
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <SemiButton secondary onClick={() => setOpenDelete(false)}>cancel</SemiButton>
                    <SemiButton negative onClick={deleteCustomer}>delete <BsX /></SemiButton>
                </Modal.Actions>
            </Modal>


        </div>
    )
}

export default CustomerComponent;

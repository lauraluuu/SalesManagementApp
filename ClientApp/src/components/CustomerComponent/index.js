import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsCheck2, BsX } from "react-icons/bs";
import { Button as SemiButton, Modal, Form } from 'semantic-ui-react';
import CopyRight from '../CopyRight';

 const CustomerComponent = (props) => {
    const [customersList, setCustomersList] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
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

    /* INSERT CUSTOMER */
    const [customerToAdd, setCustomerToAdd] = useState({ name: '', address: '' });
    const handleCustomerToAddInputChange = (event) => {
        const { name, value } = event.target;
        let customerToAddNewReference = { ...customerToAdd, [name]: value };
        setCustomerToAdd(customerToAddNewReference);
    }

    const confirmNewCustomer = () => {
        axios.post("https://localhost:7192/api/Customer/Save", customerToAdd).then(response => {
            let customersNewReference = [...customersList];
            customersNewReference.push(response.data);
            setCustomersList(customersNewReference);
            setOpenCreate(false); //close Create Modal
        })
    }

    /* UPDATE CUSTOMER */
    const [customerToEdit, setCustomerToEdit] = useState({ name: '', address: '' });
    const handleCustomerToEditInputChange = (event) => {
        const { name, value } = event.target;
        let customerToEditNewReference = { ...customerToEdit, [name]: value };
        setCustomerToEdit(customerToEditNewReference);
    }

    const handleCustomerEdit = (item) => {
        setCustomerToEdit(item);

        setOpenEdit(true);
    }

    const confirmUpdate = () => {
        axios.put("https://localhost:7192/api/Customer/Update", customerToEdit).then(response => {
            let customersNewReference = [...customersList];
            const index = customersNewReference.findIndex((item) => item.id === customerToEdit.id);
            customersNewReference[index] = customerToEdit;
            setCustomersList(customersNewReference);
            setOpenEdit(false);
        })
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
                <Button
                    onClick={() => setOpenCreate(true)}
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
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.address}</td>
                            <td><Button onClick={() => handleCustomerEdit(item)} color="warning" style={{color: "white"}}><FaEdit color="white"/> EDIT </Button></td>
                            <td><Button onClick={() => handleCustomerDelete(item)} color="danger"><MdDelete color="white"/> DELETE</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <CopyRight />

            {/* Create Modal */}
            <Modal
                size={"tiny"}
                centered={false}
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onOpen={() => setOpenCreate(true)}
            >
                <Modal.Header>Create Customer</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>NAME</label>
                            <input placeholder='' name="name" value={customerToAdd.name} onChange={handleCustomerToAddInputChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>ADDRESS</label>
                            <input placeholder='' name="address" value={customerToAdd.address} onChange={handleCustomerToAddInputChange}/>
                        </Form.Field>
                    </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <SemiButton secondary onClick={() => setOpenCreate(false)}>cancel</SemiButton>
                    <SemiButton positive onClick={confirmNewCustomer}>create <BsCheck2 /></SemiButton>
                </Modal.Actions>
            </Modal>

            {/* Edit Modal */}
            <Modal
                size={"tiny"}
                centered={false}
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                onOpen={() => setOpenEdit(true)}
            >
                <Modal.Header>Edit Customer</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>NAME</label>
                            <input name="name" value={customerToEdit.name} placeholder={customerToEdit.name} onChange={handleCustomerToEditInputChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>ADDRESS</label>
                            <input name="address" value={customerToEdit.address} placeholder={customerToEdit.address} onChange={handleCustomerToEditInputChange}/>
                        </Form.Field>
                    </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <SemiButton secondary onClick={() => setOpenEdit(false)}>cancel</SemiButton>
                    <SemiButton positive onClick={confirmUpdate}>edit <BsCheck2 /></SemiButton>
                </Modal.Actions>
            </Modal>

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

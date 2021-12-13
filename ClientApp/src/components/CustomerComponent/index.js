import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsCheck2, BsX } from "react-icons/bs";
import { Button as SemiButton, Modal, Form } from 'semantic-ui-react';

 const CustomerComponent = (props) => {
    const [customersList, setCustomersList] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const copyRightStyle = {
        font: "10px Arial, sans-serif"
    };

    /* GET CUSTOMERS LIST */
    const getCustomersList = () => {
        let URL = "https://localhost:7192/api/Customer/GetAll";

        axios.get(URL).then(response => {
            setCustomersList(response.data);
        })
    }

    /* INSERT CUSTOMER */
    const [customerToAdd, setCustomerToAdd] = useState({ name: '', address: '' });
    const handleCustomerToAddInputChange = (event) => {
        console.log(event);
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
    const handleCustomerInputChange = () => {

    }

    useEffect(() => {
        getCustomersList();
    }, [])

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
                            <td><Button onClick={() => setOpenEdit(true)} color="warning" style={{color: "white"}}><FaEdit color="white"/> EDIT </Button></td>
                            <td><Button onClick={() => setOpenDelete(true)} color="danger"><MdDelete color="white"/> DELETE</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div style={copyRightStyle}>&copy; 2020 - Laura Lu</div>

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
                            <input placeholder='' />
                        </Form.Field>
                        <Form.Field>
                            <label>ADDRESS</label>
                            <input placeholder='' />
                        </Form.Field>
                    </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <SemiButton secondary onClick={() => setOpenEdit(false)}>cancel</SemiButton>
                    <SemiButton positive onClick={() => setOpenEdit(false)}>edit <BsCheck2 /></SemiButton>
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
                <Modal.Header>Delete Customer</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        Are you sure?
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <SemiButton secondary onClick={() => setOpenDelete(false)}>cancel</SemiButton>
                    <SemiButton negative onClick={() => setOpenDelete(false)}>delete <BsX /></SemiButton>
                </Modal.Actions>
            </Modal>


        </div>
    )
}

export default CustomerComponent;

import React, { useState } from 'react';
import axios from 'axios';
import { BsCheck2 } from "react-icons/bs";
import { Button, Modal, Form } from 'semantic-ui-react';

const AddCustomerModal = (props) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [openCreate, setOpenCreate] = useState(false);
    const [customer, setCustomer] = useState({id: '', name: '', address: '' });

    const handleNameInputChange = (event) => {
        setName(event.target.value);
    }

    const handleAddressInputChange = (event) => {
        setAddress(event.target.value);
    }

    const confirmNewCustomer = () => {

        axios.post("https://localhost:7192/api/Customer/Save", {name, address}).then(response => {

            props.getCustomersList();
            setOpenCreate(false); //close Create Modal
        })
    }

    const handleAddCustomer = () => {
        props.handleAddCustomer(customer);
    }

    return (
        <Modal
            size={"tiny"}
            centered={false}
            open={openCreate}
            onClose={() => setOpenCreate(false)}
            onOpen={() => setOpenCreate(true)}
            trigger={<Button primary>New Customer</Button>}
            handleAddCustomer={handleAddCustomer}
        >
            <Modal.Header>Create Customer</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                <Form>
                    <Form.Field>
                        <label>NAME</label>
                        <input placeholder='' value={name} onChange={handleNameInputChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>ADDRESS</label>
                        <input placeholder='' value={address} onChange={handleAddressInputChange}/>
                    </Form.Field>
                </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button secondary onClick={() => setOpenCreate(false)}>cancel</Button>
                <Button positive onClick={confirmNewCustomer} type='submit'>create <BsCheck2 /></Button>
            </Modal.Actions>
        </Modal>
    )
}

export default AddCustomerModal;

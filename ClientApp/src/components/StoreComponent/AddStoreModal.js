import React, { useState } from 'react';
import axios from 'axios';
import { BsCheck2 } from "react-icons/bs";
import { Button, Modal, Form } from 'semantic-ui-react';

const AddStoreModal = (props) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [openCreate, setOpenCreate] = useState(false);

    const handleNameInputChange = (event) => {
        setName(event.target.value);
    }

    const handleAddressInputChange = (event) => {
        setAddress(event.target.value);
    }

    const confirmNewStore = () => {

        axios.post("https://sales-manage-app.azurewebsites.net/api/Store/Save", {name, address}).then(response => {
            props.getStoresList();

            setOpenCreate(false); //close Create Modal
        })
    }

    return (
        <Modal
            size={"tiny"}
            centered={false}
            open={openCreate}
            onClose={() => setOpenCreate(false)}
            onOpen={() => setOpenCreate(true)}
            trigger={<Button primary>New Store</Button>}
        >
            <Modal.Header>Create Store</Modal.Header>
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
                <Button positive onClick={confirmNewStore} type='submit'>create <BsCheck2 /></Button>
            </Modal.Actions>
        </Modal>
    )
}

export default AddStoreModal;

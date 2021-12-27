import React, { useState } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { BsCheck2 } from "react-icons/bs";
import { Button as SemiButton, Modal, Form } from 'semantic-ui-react';

 const EditStoreModal = (props) => {
    const [id, setId] = useState(props.store.id);
    const [name, setName] = useState(props.store.name);
    const [address, setAddress] = useState(props.store.address);
    const [openEdit, setOpenEdit] = useState(false);

    const handleNameInputChange = (event) => {
        setName(event.target.value);
    }

    const handleAddressInputChange = (event) => {
        setAddress(event.target.value);
    }

    const confirmUpdate = () => {
        axios.put("https://localhost:7192/api/Store/Update", {id: id, name: name, address: address}).then(response => {
            props.getStoresList();
            setOpenEdit(false);
        })
    }

    return (
        <Modal
            size={"tiny"}
            centered={false}
            open={openEdit}
            onClose={() => setOpenEdit(false)}
            onOpen={() => setOpenEdit(true)}
            trigger={<Button color="warning" style={{color: "white"}}><FaEdit color="white"/> EDIT </Button>}
        >
            <Modal.Header>Edit Store</Modal.Header>
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
                <SemiButton secondary onClick={() => setOpenEdit(false)}>cancel</SemiButton>
                <SemiButton positive onClick={confirmUpdate}>edit <BsCheck2 /></SemiButton>
            </Modal.Actions>
        </Modal>
    )
}

export default EditStoreModal;
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { BsCheck2 } from "react-icons/bs";
import { Button as SemiButton, Modal, Form } from 'semantic-ui-react';

 const EditProductModal = (props) => {
    const [id, setId] = useState(props.product.id);
    const [name, setName] = useState(props.product.name);
    const [price, setPrice] = useState(props.product.price);
    const [openEdit, setOpenEdit] = useState(false);

    const handleNameInputChange = (event) => {
        setName(event.target.value);
    }

    const handleAddressInputChange = (event) => {
        setPrice(event.target.value);
    }

    const confirmUpdate = () => {
        axios.put("https://localhost:7192/api/Product/Update", {id: id, name: name, price: price}).then(response => {
            props.getProductsList();
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
            <Modal.Header>Edit PRODUCT</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                <Form>
                    <Form.Field>
                        <label>NAME</label>
                        <input placeholder='' value={name} onChange={handleNameInputChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>PRICE</label>
                        <input placeholder='' value={price} onChange={handleAddressInputChange}/>
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

export default EditProductModal;

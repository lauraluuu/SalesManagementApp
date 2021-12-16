import React, { useState } from 'react';
import axios from 'axios';
import { BsCheck2 } from "react-icons/bs";
import { Button, Modal, Form } from 'semantic-ui-react';

const AddProductModal = (props) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [openCreate, setOpenCreate] = useState(false);

    const handleNameInputChange = (event) => {
        setName(event.target.value);
    }

    const handlePriceInputChange = (event) => {
        setPrice(event.target.value);
    }

    const confirmNewProduct = () => {

        axios.post("https://localhost:7192/api/Product/Save", {name, price}).then(response => {
            props.getProductsList();

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
            trigger={<Button primary>New Product</Button>}
        >
            <Modal.Header>Create Product</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                <Form>
                    <Form.Field>
                        <label>NAME</label>
                        <input placeholder='' value={name} onChange={handleNameInputChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>PRICE</label>
                        <input placeholder='' value={price} onChange={handlePriceInputChange}/>
                    </Form.Field>
                </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button secondary onClick={() => setOpenCreate(false)}>cancel</Button>
                <Button positive onClick={confirmNewProduct} type='submit'>create <BsCheck2 /></Button>
            </Modal.Actions>
        </Modal>
    )
}

export default AddProductModal;

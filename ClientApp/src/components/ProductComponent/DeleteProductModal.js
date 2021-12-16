import React, { useState } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { BsX } from "react-icons/bs";
import { Button as SemiButton, Modal } from 'semantic-ui-react';

 const DeleteProductModal = (props) => {
    const [id, setId] = useState(props.product.id);
    const [name, setName] = useState(props.product.name);
    const [price, setPrice] = useState(props.product.price);
    const [openDelete, setOpenDelete] = useState(false);
    
    const deleteProduct = () => {
        axios.delete("https://localhost:7192/api/Product/Delete", { data: {id:id, name:name, price:price} }).then(response => {
            props.getProductsList();
            setOpenDelete(false);
        })
    }

    return (
        <Modal
        size={"tiny"}
        centered={false}
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onOpen={() => setOpenDelete(true)}
        trigger={<Button color="danger"><MdDelete color="white"/> DELETE</Button>}
    >
        <Modal.Header>Delete Product {name}</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                Are you sure?
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <SemiButton secondary onClick={() => setOpenDelete(false)}>cancel</SemiButton>
            <SemiButton negative onClick={deleteProduct}>delete <BsX /></SemiButton>
        </Modal.Actions>
    </Modal>
    )
}

export default DeleteProductModal;

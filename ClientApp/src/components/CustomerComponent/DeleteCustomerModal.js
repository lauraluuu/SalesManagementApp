import React, { useState } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import {  BsX } from "react-icons/bs";
import { Button as SemiButton, Modal } from 'semantic-ui-react';

 const DeleteCustomerModal = (props) => {
    const [id, setId] = useState(props.customer.id);
    const [name, setName] = useState(props.customer.name);
    const [address, setAddress] = useState(props.customer.address);
    const [openDelete, setOpenDelete] = useState(false);

    const deleteCustomer = () => {
        axios.delete("https://sales-manage-app.azurewebsites.net/api/Customer/Delete", { data: {id:id, name:name, address:address} }).then(response => {
            props.getCustomersList();
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
            <Modal.Header>Delete Customer {name}</Modal.Header>
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
    )
}

export default DeleteCustomerModal;

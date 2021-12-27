import React, { useState } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { BsX } from "react-icons/bs";
import { Button as SemiButton, Modal } from 'semantic-ui-react';

 const DeleteStoreModal = (props) => {
    const [id, setId] = useState(props.store.id);
    const [name, setName] = useState(props.store.name);
    const [address, setAddress] = useState(props.store.address);
    const [openDelete, setOpenDelete] = useState(false);

    const deleteStore = () => {
        axios.delete("https://sales-manage-app.azurewebsites.net/api/Store/Delete", { data: {id:id, name:name, address:address} }).then(response => {
            props.getStoresList();
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
        <Modal.Header>Delete Store {name}</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                Are you sure?
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <SemiButton secondary onClick={() => setOpenDelete(false)}>cancel</SemiButton>
            <SemiButton negative onClick={deleteStore}>delete <BsX /></SemiButton>
        </Modal.Actions>
    </Modal>
    )
}

export default DeleteStoreModal;

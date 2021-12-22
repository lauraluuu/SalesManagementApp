import React, { useState } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { BsX } from "react-icons/bs";
import { Button as SemiButton, Modal } from 'semantic-ui-react';

 const DeleteSalesModal = (props) => {
    const [id, setId] = useState(props.sales.id);
    const [openDelete, setOpenDelete] = useState(false);

    const deleteSales = () => {
        axios.delete(`https://localhost:7192/api/Sales/Delete?id=${id}`).then(response => {
            props.getSalesList();

            setOpenDelete(false);
        })
    }

    return (
        <div>
            <Modal
                size={"tiny"}
                centered={false}
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                onOpen={() => setOpenDelete(true)}
                trigger={<Button color="danger"><MdDelete color="white"/> DELETE</Button>}
            >
                <Modal.Header>Delete Sales</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        Are you sure?
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <SemiButton secondary onClick={() => setOpenDelete(false)}>cancel</SemiButton>
                    <SemiButton negative onClick={deleteSales}>delete <BsX /></SemiButton>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default DeleteSalesModal;

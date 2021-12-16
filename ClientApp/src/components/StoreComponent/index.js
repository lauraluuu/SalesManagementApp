import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsCheck2, BsX } from "react-icons/bs";
import { Button as SemiButton, Modal, Form } from 'semantic-ui-react';
import CopyRight from '../CopyRight';

 const StoreComponent = (props) => {
    const [storesList, setStoresList] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const copyRightStyle = {
        font: "10px Arial, sans-serif"
    };

    /* GET STORES LIST */
    const getStoresList = () => {
        let URL = "https://localhost:7192/api/Store/GetAll";

        axios.get(URL).then(response => {
            setStoresList(response.data);
        })
    }

    useEffect(() => {
        getStoresList();
    }, [])

    /* INSERT STORE */
    const [storeToAdd, setStoreToAdd] = useState({ name: '', address: '' });
    const handleStoreToAddInputChange = (event) => {
        console.log(event);
        const { name, value } = event.target;
        let storeToAddNewReference = { ...storeToAdd, [name]: value };
        setStoreToAdd(storeToAddNewReference);
    }

    const confirmNewStore = () => {
        console.log(storeToAdd);
        axios.post("https://localhost:7192/api/Store/Save", storeToAdd).then(response => {
            let storesNewReference = [...storesList];
            storesNewReference.push(response.data);
            setStoresList(storesNewReference);
            setOpenCreate(false); //close Create Modal
        })
    }

    /* UPDATE STORE */
    const [storeToEdit, setStoreToEdit] = useState({ name: '', address: '' });
    const handleStoreToEditInputChange = (event) => {
        const { name, value } = event.target;
        let storeToEditNewReference = { ...storeToEdit, [name]: value };
        setStoreToEdit(storeToEditNewReference);
    }

    const handleStoreEdit = (item) => {
        setStoreToEdit(item);

        setOpenEdit(true);
    }

    const confirmUpdate = () => {
        axios.put("https://localhost:7192/api/Store/Update", storeToEdit).then(response => {
            let customersNewReference = [...storesList];
            const index = customersNewReference.findIndex((item) => item.id === storeToEdit.id);
            customersNewReference[index] = storeToEdit;
            setStoresList(customersNewReference);
            setOpenEdit(false);
        })
    }

    /* DELETE STORE */
    const handleStoreDelete = (item) => {
        setStoreToEdit(item);

        setOpenDelete(true);
    }

    const deleteStore = () => {
        axios.delete("https://localhost:7192/api/Store/Delete", { data: storeToEdit }).then(response => {
            let storesNewReference = [...storesList];
            const index = storesNewReference.findIndex((item) => item.id === storeToEdit.id);
            storesNewReference.splice(index, 1);
            setStoreToEdit({ name: '', address: '' });
            setStoresList(storesNewReference);
            setOpenDelete(false);
        })
    }

    return (
        <div>
            <div>
                <Button
                    onClick={() => setOpenCreate(true)}
                    color="primary"
                >
                    New Store
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
                    {storesList.map(item => 
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.address}</td>
                            <td><Button onClick={() => handleStoreEdit(item)} color="warning" style={{color: "white"}}><FaEdit color="white"/> EDIT</Button></td>
                            <td><Button onClick={() => handleStoreDelete(item)} color="danger"><MdDelete color="white"/> DELETE</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <CopyRight />

            {/* Create Modal */}
            <Modal
                size={"tiny"}
                centered={false}
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onOpen={() => setOpenCreate(true)}
            >
                <Modal.Header>Create Store</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>NAME</label>
                            <input placeholder='' name="name" value={storeToAdd.name} onChange={handleStoreToAddInputChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>ADDRESS</label>
                            <input placeholder=''  name="address" value={storeToAdd.address} onChange={handleStoreToAddInputChange} />
                        </Form.Field>
                    </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <SemiButton secondary onClick={() => setOpenCreate(false)}>cancel</SemiButton>
                    <SemiButton positive onClick={confirmNewStore}>create <BsCheck2 /></SemiButton>
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
                <Modal.Header>Edit Store</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>NAME</label>
                            <input name="name" value={storeToEdit.name} placeholder={storeToEdit.name} onChange={handleStoreToEditInputChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>ADDRESS</label>
                            <input name="address" value={storeToEdit.address} placeholder={storeToEdit.address} onChange={handleStoreToEditInputChange} />
                        </Form.Field>
                    </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <SemiButton secondary onClick={() => setOpenEdit(false)}>cancel</SemiButton>
                    <SemiButton positive onClick={confirmUpdate}>edit <BsCheck2 /></SemiButton>
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
                <Modal.Header>Delete Store {storeToEdit.name}</Modal.Header>
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
        </div>
    )
}

export default StoreComponent;

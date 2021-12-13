import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsCheck2, BsX } from "react-icons/bs";
import { Button as SemiButton, Modal, Form } from 'semantic-ui-react';

const copyRightStyle = {
    font: "10px Arial, sans-serif"
};

 const SalesComponent = (props) => {
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    /* list sales */
    const [salsList, setSalesList] = useState([]);

    /* GET SALES LIST */
    const getSalesList = () => {
        let URL = "https://localhost:7192/api/Sales/GetAll";

        axios.get(URL).then(response => {
            setSalesList(response.data);
        })
    }

    useEffect(() => {
        getSalesList();
    }, [])

    return (
        <div>
            <div>
                <Button
                    onClick={() => setOpenCreate(true)}
                    color="primary"
                >
                    New Sale
                </Button>
            </div>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Store</th>
                    <th>Date Sold</th>
                    <th>Actions</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {salsList.map(item => (
                        <tr key={item.id}>
                            <td>{item.customer.name}</td>
                            <td>{item.product.name}</td>
                            <td>{item.store.name}</td>
                            <td>{item.dateSold}</td>
                            <td><Button onClick={() => setOpenEdit(true)} color="warning" style={{color: "white"}}><FaEdit color="white"/> EDIT</Button></td>
                            <td><Button onClick={() => setOpenDelete(true)} color="danger"><MdDelete color="white"/> DELETE</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div style={copyRightStyle}>&copy; 2020 - Laura Lu</div>

            {/* Create Modal */}
            <Modal
                size={"tiny"}
                centered={false}
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onOpen={() => setOpenCreate(true)}
            >
                <Modal.Header>Create Sales</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>Date sold</label>
                            <input placeholder='' />
                        </Form.Field>
                        <Form.Field>
                            <label>Customer</label>
                            <input placeholder='' />
                        </Form.Field>
                        <Form.Field>
                            <label>Product</label>
                            <input placeholder='' />
                        </Form.Field>
                        <Form.Field>
                            <label>Store</label>
                            <input placeholder='' />
                        </Form.Field>
                    </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <SemiButton secondary onClick={() => setOpenCreate(false)}>cancel</SemiButton>
                    <SemiButton positive onClick={() => setOpenCreate(false)}>create <BsCheck2 /></SemiButton>
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
                <Modal.Header>Edit Sales</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>Date sold</label>
                            <input type="date" placeholder='' />
                        </Form.Field>
                        <Form.Field>
                            <label>Customer</label>
                            <input placeholder='' />
                        </Form.Field>
                        <Form.Field>
                            <label>Product</label>
                            <input placeholder='' />
                        </Form.Field>
                        <Form.Field>
                            <label>Store</label>
                            <input placeholder='' />
                        </Form.Field>
                    </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <SemiButton secondary onClick={() => setOpenEdit(false)}>cancel</SemiButton>
                    <SemiButton positive onClick={() => setOpenEdit(false)}>edit <BsCheck2 /></SemiButton>
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
                <Modal.Header>Delete Sales</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        Are you sure?
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <SemiButton secondary onClick={() => setOpenDelete(false)}>cancel</SemiButton>
                    <SemiButton negative onClick={() => setOpenDelete(false)}>delete <BsX /></SemiButton>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default SalesComponent;

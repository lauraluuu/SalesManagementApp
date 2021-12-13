import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsCheck2, BsX } from "react-icons/bs";
import { Button as SemiButton, Modal, Form } from 'semantic-ui-react';

 const ProductComponent = (props) => {
    const [productsList, setProductsList] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const copyRightStyle = {
        font: "10px Arial, sans-serif"
    };

    /* GET PRODUCT LIST */
    const getProductsList = () => {
        let URL = "https://localhost:7192/api/Product/GetAll";

        axios.get(URL).then(response => {
            setProductsList(response.data);
        })
    }

    useEffect(() => {
        getProductsList();
    }, [])

    /* INSERT PRODUCT */
    const [productToAdd, setProductToAdd] = useState({ name: '', address: '' });
    const handleProductToAddInputChange = (event) => {
        console.log(event);
        const { name, value } = event.target;
        let productToAddNewReference = { ...productToAdd, [name]: value };
        setProductToAdd(productToAddNewReference);
    }

    const confirmNewProduct = () => {
        axios.post("https://localhost:7192/api/Product/Save", productToAdd).then(response => {
            let productsNewReference = [...productsList];
            productsNewReference.push(response.data);
            setProductsList(productsNewReference);
            setOpenCreate(false); //close Create Modal
        })
    }

    return (
        <div>
            <div>
                <Button
                    onClick={() => setOpenCreate(true)}
                    color="primary"
                >
                    New Product
                </Button>
            </div>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {productsList.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
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
                <Modal.Header>Create Product</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>NAME</label>
                            <input placeholder='' name="name" value={productToAdd.name} onChange={handleProductToAddInputChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>PRICE</label>
                            <input placeholder='' name="price" value={productToAdd.price} onChange={handleProductToAddInputChange} />
                        </Form.Field>
                    </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <SemiButton secondary onClick={() => setOpenCreate(false)}>cancel</SemiButton>
                    <SemiButton positive onClick={confirmNewProduct}>create <BsCheck2 /></SemiButton>
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
                <Modal.Header>Edit Product</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>NAME</label>
                            <input placeholder='' />
                        </Form.Field>
                        <Form.Field>
                            <label>PRICE</label>
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
                <Modal.Header>Delete Product</Modal.Header>
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

export default ProductComponent;

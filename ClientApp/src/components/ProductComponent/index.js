﻿import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsCheck2, BsX } from "react-icons/bs";
import { Button as SemiButton, Modal, Form } from 'semantic-ui-react';
import CopyRight from '../CopyRight';
import AddProductModal from './AddProductModal'

 const ProductComponent = (props) => {
    const [productsList, setProductsList] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

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

    /* UPDATE PRODUCT */
    const [productToEdit, setProductToEdit] = useState({ name: '', price: '' });
    const handleProductToEditInputChange = (event) => {
        const { name, value } = event.target;
        let productToEditNewReference = { ...productToEdit, [name]: value };
        setProductToEdit(productToEditNewReference);
    }

    const handleProductEdit = (item) => {
        setProductToEdit(item);

        setOpenEdit(true);
    }

    const confirmUpdate = () => {
        axios.put("https://localhost:7192/api/Product/Update", productToEdit).then(response => {
            let productsNewReference = [...productsList];
            const index = productsNewReference.findIndex((item) => item.id === productToEdit.id);
            productsNewReference[index] = productToEdit;
            setProductsList(productsNewReference);
            setOpenEdit(false);
        })
    }

    /* DELETE PRODUCT */
    const handleProductDelete = (item) => {
        setProductToEdit(item);

        setOpenDelete(true);
    }

    const deleteProduct = () => {
        axios.delete("https://localhost:7192/api/Product/Delete", { data: productToEdit }).then(response => {
            let productsNewReference = [...productsList];
            const index = productsNewReference.findIndex((item) => item.id === productToEdit.id);
            productsNewReference.splice(index, 1);
            setProductToEdit({ name: '', price: '' });
            setProductsList(productsNewReference);
            setOpenDelete(false);
        })
    }

    return (
        <div>
            <div>
                <AddProductModal getProductsList={getProductsList} />
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
                            <td><Button onClick={() => handleProductEdit(item)} color="warning" style={{color: "white"}}><FaEdit color="white"/> EDIT</Button></td>
                            <td><Button onClick={() => handleProductDelete(item)} color="danger"><MdDelete color="white"/> DELETE</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CopyRight />

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
                            <input name="name" value={productToEdit.name} placeholder={productToEdit.name} onChange={handleProductToEditInputChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>PRICE</label>
                            <input name="price" value={productToEdit.price} placeholder={productToEdit.price} onChange={handleProductToEditInputChange} />
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
                <Modal.Header>Delete Product {productToEdit.name}</Modal.Header>
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
        </div>
    )
}

export default ProductComponent;

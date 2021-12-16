import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsCheck2, BsX } from "react-icons/bs";
import { Button as SemiButton, Modal, Form } from 'semantic-ui-react';
import CopyRight from '../CopyRight';

 const SalesComponent = (props) => {
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [salesList, setSalesList] = useState([]);
    const [storesList, setStoresList] = useState([]);
    const [productsList, setProductsList] = useState([]);
    const [customersList, setCustomersList] = useState([]);

    /* GET SALES LIST */
    const getSalesList = () => {
        let URL = "https://localhost:7192/api/Sales/GetAll";

        axios.get(URL).then(response => {
            setSalesList(response.data);
        })
    }

    /* GET STORES LIST */
    const getStoresList = () => {
        let URL = "https://localhost:7192/api/Store/GetAll";

        axios.get(URL).then(response => {
            setStoresList(response.data);
        })
    }

    /* GET PRODUCT LIST */
    const getProductsList = () => {
        let URL = "https://localhost:7192/api/Product/GetAll";

        axios.get(URL).then(response => {
            setProductsList(response.data);
        })
    }

    /* GET CUSTOMERS LIST */
    const getCustomersList = () => {
        let URL = "https://localhost:7192/api/Customer/GetAll";

        axios.get(URL).then(response => {
            setCustomersList(response.data);
        })
    }

    useEffect(() => {
        getSalesList();
        getStoresList();
        getProductsList();
        getCustomersList();
    }, [])

    /* DELETE SALES */
    const [salesToDelete, setSalesToDelete] = useState({id: undefined});
    const handleSalesDelete = (item) => {
        setSalesToDelete({id: item.id});

        setOpenDelete(true);
    }

    const deleteSales = () => {
        console.log(salesToDelete);

        axios.delete(`https://localhost:7192/api/Sales/Delete?id=${salesToDelete.id}`).then(response => {
            let salesNewReference = [...salesList];
            const index = salesNewReference.findIndex((item) => item.id === salesToDelete);
            salesNewReference.splice(index, 1);
            setSalesToDelete({id: undefined});
            setStoresList(salesNewReference);
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
                    {salesList.map(item => (
                        <tr key={item.id}>
                            <td>{item.customer.name}</td>
                            <td>{item.product.name}</td>
                            <td>{item.store.name}</td>
                            <td>{new Date(item.dateSold).toLocaleDateString()}</td>
                            <td><Button onClick={() => setOpenEdit(true)} color="warning" style={{color: "white"}}><FaEdit color="white"/> EDIT</Button></td>
                            <td><Button onClick={() => handleSalesDelete(item)} color="danger"><MdDelete color="white"/> DELETE</Button></td>
                        </tr>
                    ))}
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
                <Modal.Header>Create Sales</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <Form>
                        <Form.Field>
                            <label>Date sold</label>
                            <input type="date" placeholder='' />
                        </Form.Field>
                        <Form.Field
                            label="Customer"
                            control="select"
                            onChange={e=>e.target.value}
                            required
                        >
                            <option key="1" value="">select customer</option>
                            {
                                productsList.map(c=>(
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))
                            }
                        </Form.Field>
                        <Form.Field
                            label="Customer"
                            control="select"
                            onChange={e=>e.target.value}
                            required
                        >
                            <option key="1" value="">select customer</option>
                            {
                                productsList.map(c=>(
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))
                            }
                        </Form.Field>
                        <Form.Field
                            label="Product"
                            control="select"
                            onChange={e=>e.target.value}
                            required
                        >
                            <option key="1" value="">select product</option>
                            {
                                productsList.map(c=>(
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))
                            }
                        </Form.Field>
                        <Form.Field
                            label="Store"
                            control="select"
                            onChange={e=>e.target.value}
                            required
                        >
                            <option key="1" value="">select store</option>
                            {
                                productsList.map(c=>(
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))
                            }
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
                        <Form.Field
                            label="Customer"
                            control="select"
                            onChange={e=>e.target.value}
                            required
                        >
                            <option key="1" value="">select customer</option>
                            {
                                productsList.map(c=>(
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))
                            }
                        </Form.Field>
                        <Form.Field
                            label="Product"
                            control="select"
                            onChange={e=>e.target.value}
                            required
                        >
                            <option key="1" value="">select product</option>
                            {
                                productsList.map(c=>(
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))
                            }
                        </Form.Field>
                        <Form.Field
                            label="Store"
                            control="select"
                            onChange={e=>e.target.value}
                            required
                        >
                            <option key="1" value="">select store</option>
                            {
                                productsList.map(c=>(
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))
                            }
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
                    <SemiButton negative onClick={deleteSales}>delete <BsX /></SemiButton>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default SalesComponent;

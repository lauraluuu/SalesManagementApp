import React, { useState } from 'react';
import axios from 'axios';
import { BsCheck2 } from "react-icons/bs";
import { Button } from 'reactstrap';
import { Button as SemiButton, Modal, Form, Select } from 'semantic-ui-react';
import { FaEdit } from "react-icons/fa";

const EditSalesModal = (props) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [storeId, setStoreId] = useState(props.sales.store.id);
    const [store, setStore] = useState(props.sales.store);
    const [productId, setProductId] = useState(props.sales.product.id);
    const [product, setProduct] = useState(props.sales.product);
    const [customerId, setCustomerId] = useState(props.sales.customer.id);
    const [customer, setCustomer] = useState(props.sales.customer);
    const [dateSold, setDateSold] = useState(props.sales.dateSold);
    const [id, setId] = useState(props.id);
    const [sales, setSales] = useState(props.sales);

    /* CHANGE CUSTOMER INPUT */
    const handleCustomerInputChange = (event, data) => {
        setCustomerId(data.value);

        const temp = props.customersList.find(item => item.id === data.value);
        setCustomer({id: temp.id, name: temp.name, address: temp.address});
        console.log(temp);
    }

    /* CHANGE PRODUCT INPUT */
    const handleProductInputChange = (event, data) => {
        setProductId(data.value);

        const temp = props.productsList.find(item => item.id === data.value);
        console.log(temp);
        setProduct(temp);
    }

    /* CHANGE STORE INPUT */
    const handleStoreInputChange = (event, data) => {
        setStoreId(data.value);

        const temp = props.storesList.find(item => item.id === data.value);
        console.log(temp);
        setStore(temp);
    }

    /* CHANGE DATE INPUT */
    const handleDateSoldInputChange = (event) => {
        setDateSold(event.target.value);
    }

    const confirmUpdate = () => {
        axios.put("https://sales-manage-app.azurewebsites.net/api/Sales/Update", 
        {
            id: id, 
            dateSold: dateSold, 
            customerId: customer.id, 
            productId: product.id, 
            storeId: store.id
        }).then(response => {
            props.getSalesList();
            setOpenEdit(false); //close Create Modal
        })
    }

    return (
        <Modal
            size={"tiny"}
            centered={false}
            open={openEdit}
            onClose={() => setOpenEdit(false)}
            onOpen={() => setOpenEdit(true)}
            trigger={<Button color="warning" style={{color: "white"}}><FaEdit color="white"/> EDIT</Button>}
        >
            <Modal.Header>Edit Sales</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                <Form>
                    <Form.Field
                        onChange={handleDateSoldInputChange}
                    >
                        <label>Date sold</label>
                        <input type="date"
                         placeholder={props.sales.dateSold}
                         defaultValue={props.sales.dateSold}
                         value={dateSold}/>
                    </Form.Field>
                    <Form.Field
                        label="Customer"
                        name="customerId"
                        defaultValue={props.sales.customer.name}
                        placeholder={props.sales.customer.name}
                        control={Select}
                        onChange={handleCustomerInputChange}
                        required
                        options={props.customersList.map((c) => ({
                            key: c.id,
                            text: c.name,
                            value: c.id,
                        }))}
                    >
                    </Form.Field>
                    <Form.Field
                        label="Product"
                        name="productId"
                        defaultValue={props.sales.product.name}
                        placeholder={props.sales.product.name}
                        control={Select}
                        onChange={handleProductInputChange}
                        required
                        options={props.productsList.map((c) => ({
                            key: c.id,
                            text: c.name,
                            value: c.id,
                        }))}
                    >
                    </Form.Field>
                    <Form.Field
                        label="Store"
                        name="storeId"
                        defaultValue={props.sales.store.name}
                        placeholder={props.sales.store.name}
                        control={Select}
                        onChange={handleStoreInputChange}
                        required
                        options={props.storesList.map((c) => ({
                            key: c.id,
                            text: c.name,
                            value: c.id,
                        }))}
                    >
                    </Form.Field>
                </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <SemiButton secondary onClick={() => setOpenEdit(false)}>cancel</SemiButton>
                <SemiButton positive onClick={confirmUpdate}>edit <BsCheck2 /></SemiButton>
            </Modal.Actions>
        </Modal>
    )
}

export default EditSalesModal;

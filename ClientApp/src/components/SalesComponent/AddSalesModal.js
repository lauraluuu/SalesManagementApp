import React, { useState } from 'react';
import axios from 'axios';
import { BsCheck2 } from "react-icons/bs";
import { Button } from 'reactstrap';
import { Button as SemiButton, Modal, Form } from 'semantic-ui-react';

const AddSalesModal = (props) => {
    const [openCreate, setOpenCreate] = useState(false);
    const [storeId, setStoreId] = useState('');
    const [productId, setProductId] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [dateSold, setDateSold] = useState('');

    /* CHANGE CUSTOMER INPUT */
    const handleCustomerInputChange = (event) => {
        console.log(event.target.value);

        setCustomerId(event.target.value);
    }

    /* CHANGE PRODUCT INPUT */
    const handleProductInputChange = (event) => {
        console.log(event.target.value);

        setProductId(event.target.value);
    }

    /* CHANGE STORE INPUT */
    const handleStoreInputChange = (event) => {
        console.log(event.target.value);

        setStoreId(event.target.value);
    }

    /* CHANGE DATE INPUT */
    const handleDateSoldInputChange = (event) => {
        setDateSold(event.target.value);
    }

    const confirmNewSale = () => {
        console.log(storeId);
        console.log(dateSold);
        console.log(customerId);
        console.log(productId);
        axios.post("https://sales-manage-app.azurewebsites.net/api/Sales/Save", 
            {
                storeId: storeId, 
                dateSold: dateSold,
                customerId: customerId,
                productId: productId

            }).then(response => {
            props.getSalesList();
            setOpenCreate(false); //close Create Modal
        })
    }

    return (
        <Modal
            size={"tiny"}
            centered={false}
            open={openCreate}
            onClose={() => setOpenCreate(false)}
            onOpen={() => setOpenCreate(true)}
            trigger={<SemiButton primary>New Sales</SemiButton>}
        >
            <Modal.Header>Create Sales</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                <Form>
                    <Form.Field
                        onChange={handleDateSoldInputChange}
                    >
                        <label>Date sold</label>
                        <input type="date" placeholder='' />
                    </Form.Field>
                    <Form.Field
                        label="Customer"
                        control="select"
                        onChange={handleCustomerInputChange}
                        required
                    >
                        <option key="0" value="">select customer</option>
                        {
                            props.customersList.map(p=>(
                                <option key={p.id} name={p.id} value={p.id}>{p.name}</option>
                            ))
                        }
                    </Form.Field>
                    <Form.Field
                        label="Product"
                        control="select"
                        onChange={handleProductInputChange}
                        required
                    >
                        <option key="0" value="">select product</option>
                        {
                            props.productsList.map(p=>(
                                <option key={p.id} name={p.name} value={p.id}>{p.name}</option>
                            ))
                        }
                    </Form.Field>
                    <Form.Field
                        label="Store"
                        control="select"
                        onChange={handleStoreInputChange}
                        required
                    >
                        <option key="0" value="">select store</option>
                        {
                            props.storesList.map(s=>(
                                <option key={s.id} name={s.name} value={s.id}>{s.name}</option>
                            ))
                        }
                    </Form.Field>
                </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <SemiButton secondary onClick={() => setOpenCreate(false)}>cancel</SemiButton>
                <SemiButton positive onClick={confirmNewSale}>create <BsCheck2 /></SemiButton>
            </Modal.Actions>
        </Modal>
    )
}

export default AddSalesModal;
